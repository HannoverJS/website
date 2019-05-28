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
    const CleanCSS = require("clean-css")
    let cleanCSS = new CleanCSS()
    return copyFiles(`${SRC_DIR}/*.css`, OUTPUT_DIR, (c) => cleanCSS.minify(c).styles)
}

async function copyAssets() {
    await copyFiles(`${SRC_DIR}/images/*`, `${OUTPUT_DIR}/images`)
    return copyFiles(`${SRC_DIR}/assets/*`, OUTPUT_DIR)
}

async function build() {
    await fs.mkdir(OUTPUT_DIR, { recursive: true })

    let partials = await glob("./src/partials/*.html")
    await Promise.all(partials.map(async (p) => {
        let content = await fs.readFile(p, "utf8")
        handlebars.registerPartial(path.basename(p, ".html"), content)
    }))

    let layout = handlebars.compile(await fs.readFile(`${SRC_DIR}/partials/layout.html`, "utf8"))

    let talks = await fetchTalks()
    let next = (await fetchEvents())[0]
    next.date = new Date(next.date).toLocaleDateString('en-GB', {
        month: 'long',
        day: 'numeric'
    })

    let data = {
        next,
        talks: (talks.length == 0) ? [{ title: undefined }] : talks,
        organizers
    }

    let output = layout(data)

    const htmlMinifier = require("html-minifier")
    output = htmlMinifier.minify(output, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    })

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
    exit(1)
})
