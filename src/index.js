const handlebars = require("handlebars")
const fs = require("fs").promises
const { promisify } = require("util")
const glob = promisify(require("glob"))
const path = require("path")

const fetchTalks = require("./talks")
const organizers = require("./organizers")
const fetchEvents = require("./events")

const OUTPUT_FILE = "./build/index.html"
const OUTPUT_DIR  = "./build"
const SRC_DIR  = "./src"
const CSS_INPUT = "./src/styles.css"
const CSS_OUTPUT = "./build/styles.css"

const LOG_ENABLED = true

function log(msg, ...args) {
    if (LOG_ENABLED) {
        console.log(`[LOG] ${msg}`, ...args)
    }
}

async function copyFiles(pattern, destination, map = (c) => c) {
    let files = await glob(pattern)
    await Promise.all(files.map(async (f) => {
        let content = await fs.readFile(f, "utf8")
        let basename = path.basename(f)
        await fs.mkdir(destination, { recursive: true })
        await fs.writeFile(path.join(destination, basename), map(content))
    }))
}

function copyCSS() {
    log("Copying CSS...")
    const CleanCSS = require("clean-css")
    let cleanCSS = new CleanCSS()
    return copyFiles(`${SRC_DIR}/*.css`, OUTPUT_DIR, (c) => cleanCSS.minify(c).styles)
}

async function copyAssets() {
    log("Copying assets...")
    await copyFiles(`${SRC_DIR}/images/*`, `${OUTPUT_DIR}/images`)
    return copyFiles(`${SRC_DIR}/assets/*`, OUTPUT_DIR)
}

async function build() {
    log("Creating output directory '%s'", OUTPUT_DIR)
    await fs.mkdir(OUTPUT_DIR, { recursive: true })

    log("Loading template partials...")
    let partials = await glob("./src/partials/*.html")
    await Promise.all(partials.map(async (p) => {
        log("Loading partial '%s'...", p)
        let content = await fs.readFile(p, "utf8")
        handlebars.registerPartial(path.basename(p, ".html"), content)
        log("Loaded partial '%s'", p)
    }))

    log("Compiling layout template...")
    let layout = handlebars.compile(await fs.readFile(`${SRC_DIR}/partials/layout.html`, "utf8"))
    log("Compiled layout template")

    log("Fetching talks...")
    let talks = await fetchTalks()
    log("Fetched talks")

    log("Fetching next event...")
    let next = (await fetchEvents())[0]
    next.date = new Intl.DateTimeFormat("en-GB", {
        month: 'long',
        day: 'numeric'
    }).format(new Date(next.date))
    log("Fetched next event")

    let data = {
        next,
        talks: (talks.length == 0) ? [{ title: undefined }] : talks,
        organizers
    }

    log("Rendering output...")
    let output = layout(data)
    log("Rendered output")

    log("Minifying html output...")
    const htmlMinifier = require("html-minifier")
    output = htmlMinifier.minify(output, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    })
    log("Minifyed html output")

    log("Writing to file '%s'", OUTPUT_FILE)
    await fs.writeFile(OUTPUT_FILE, output)

    await copyCSS()
    await copyAssets()
}

async function watch() {
    await build()

    require("fs").watch(SRC_DIR, { recursive: true }, () => {
        build()
    })

    const bs = require("browser-sync").create();

    bs.watch(`${OUTPUT_DIR}/**`).on("change", bs.reload);
    bs.init({
        server: OUTPUT_DIR
    });
}


function clean() {
    return new Promise((resolve, reject) => {
        require("child_process").exec(`rm -rf ${OUTPUT_DIR}/*`, (err, _, stderr) => {
            if (err) {
                return reject(err)
            }
            if (stderr) {
                return reject(stderr)
            }
        })
    })
}

async function main() {
    switch (process.argv[2]) {
        case "build":
            return build()
            break;
        case "watch":
            return watch()
            break;
        case "clean":
            return clean()
            break;
    }
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
