const handlebars = require("handlebars")
const fs = require("fs").promises
const { promisify } = require("util")
const glob = promisify(require("glob"))
const path = require("path")

const fetchTalks = require("./talks")
const organizers = require("./organizers")
const fetchEvents = require("./events")

const OUTPUT_FILE = "./build/index.html"
const CSS_INPUT = "./src/styles.css"
const CSS_OUTPUT = "./build/styles.css"

async function copyFiles(pattern, destination) {
    let files = await glob(pattern)
    await Promise.all(files.map(async (f) => {
        let content = await fs.readFile(f, "utf8")
        let basename = path.basename(f)
        await fs.mkdir(destination, { recursive: true })
        await fs.writeFile(path.join(destination, basename), content)
    }))
}

function copyCSS() {
    return copyFiles("./src/*.css", "build")
}

function copyAssets() {
    return copyFiles("./src/images/*", "build/images")
}

async function main() {
    let partials = await glob("./src/partials/*.html")
    await Promise.all(partials.map(async (p) => {
        let content = await fs.readFile(p, "utf8")
        handlebars.registerPartial(path.basename(p, ".html"), content)
    }))

    let layout = handlebars.compile(await fs.readFile(`./src/partials/layout.html`, "utf8"))

    // let talks = await fetchTalks()
    let talks = [
        // {
        //     title: "Snabbdom: A lightweight virtual DOM library",
        //     description: "Snabbdom is a lightweight virtual DOM library which is used in frameworks like Vue.js and Cycle.js as the DOM renderer.\nBut with under 4KB size (gzipped+minified) and a highly modular structure, Snabbdom is also very useful for building small (and not so small) dynamic web UI components without committing to a framework.\nThe talk will demonstrate how Snabbdom works and how to build simple UI components with it \"functional style\".",
        //     speaker: {
        //         name: "Karol Wegner",
        //         occupation: "Freelance full-stack developer",
        //         avatarUrl: "https://avatars0.githubusercontent.com/u/14128442?s=180&v=4",
        //         socialName: undefined,
        //         socialUrl: undefined
        //     }
        // }
    ]
    // let next = (await fetchEvents())[0]
    // next.date = new Date(next.date).toLocaleDateString('en-US', {
    //     month: 'long',
    //     day: 'numeric'
    // })

    let data = {
        next: { date: "May 28", meetupUrl: "" },
        talks: (talks.length == 0) ? [{ title: undefined }] : talks,
        organizers
    }

    await fs.writeFile(OUTPUT_FILE, layout(data))

    await copyCSS()
    await copyAssets()
}

main().catch(e => console.error(e))
