const { camelizeKeys } = require("humps")
const fetch = require("./fetch")

const GITHUB_ISSUES =
    "https://api.github.com/repos/HannoverJS/talks/issues?state=open&labels=Upcoming%20Talk"

const talkRegExp = /^#{5} (.+)(?:\s+#{6} (.+))?(?:\s+#{6} \[(.+)]\((.+)\))?\s+([\s\S]+)\s*$/

function extractTalk(body) {
    // console.log("extractTalk")
    // console.log(body)
    let [
        name = null,
        occupation = null,
        socialName = null,
        socialUrl = null,
        description = null,
    ] = body.match(talkRegExp).slice(1, 6)

    return {
        name,
        occupation,
        socialName,
        socialUrl,
        description,
    }
}

function talks(dev = false) {
    if (dev)
        return {
            title: "Test talk!",
            description: "Some description",
            speaker: {
                name: "Tobi",
                avatarUrl: "icon.png",
                occupation: "Dev at HannoverJS",
                socialName: "hannoverjs",
                socialUrl: "https://twitter.com/hannoverjs",
            },
        }

    return fetch(GITHUB_ISSUES, {
        headers: {
            Authorization: `token ${process.env.GH_TOKEN}`,
        },
    }).then(issues => {
        return camelizeKeys(issues)
            .filter(
                ({ milestone }) =>
                    Boolean(milestone) &&
                    new Date(milestone.dueOn).valueOf() > new Date().valueOf(),
            )
            .map(
                ({
                    title,
                    body,
                    user: { avatarUrl },
                    milestone: { dueOn },
                    updatedAt,
                    labels,
                }) => {
                    let date = new Date(dueOn)
                    date.setDate(date.getDate() - 1)
                    date.setHours(19)

                    let {
                        name,
                        occupation,
                        socialName,
                        socialUrl,
                        description,
                    } = extractTalk(body)
                    console.log(description)
                    let lightningTalkLabelName = "Lightning Talk"
                    let isLightningTalk = labels.some(
                        label => label.name === lightningTalkLabelName,
                    )

                    return {
                        title,
                        description,
                        date,
                        updatedAt,
                        isLightningTalk,
                        labels: labels.filter(
                            obj => obj.name !== lightningTalkLabelName,
                        ),
                        speaker: {
                            name,
                            avatarUrl,
                            occupation,
                            socialName,
                            socialUrl,
                        },
                    }
                },
            )
    })
}

talks.extractTalk = extractTalk

module.exports = talks
