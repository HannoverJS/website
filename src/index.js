const handlebars = require("handlebars")
const fs = require("fs").promises

const fetchTalks = require("./talks")
const fetchOrganizers = require("./organizers")
const fetchEvents = require("./events")

const PARTIALS_PATH = "./src/partials"
const OUTPUT_FILE = "./build/index.html"
const CSS_INPUT = "./src/styles.css"
const CSS_OUTPUT = "./build/styles.css"

async function copyCSS() {
    let content = await fs.readFile(CSS_INPUT, "utf8")
    await fs.writeFile(CSS_OUTPUT, content)
}

async function main() {
    let partials = await fs.readdir(PARTIALS_PATH)
    await Promise.all(partials.map(async (p) => {
        let content = await fs.readFile(`${PARTIALS_PATH}/${p}`, "utf8")
        handlebars.registerPartial(p.replace(".html", ""), content)
    }))

    let layout = handlebars.compile(await fs.readFile(`${PARTIALS_PATH}/layout.html`, "utf8"))

    let talks = await fetchTalks()
    let next = (await fetchEvents())[0]
    next.date = new Date(next.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    })

    let data = {
        next,
        talks: talks.concat([
            {
                title: undefined
            }
        ]),
        organizers: [
            { name: "Robin Thrift" }
        ]
        // organizers: await fetchOrganizers()
    }

    await fs.writeFile(OUTPUT_FILE, layout(data))

    await copyCSS()
}

main().catch(e => console.error(e))
