const { camelizeKeys, decamelizeKeys } = require('humps')
const fetch = require('./helpers/fetch')

const GITHUB_ISSUES_API =
  'https://api.github.com/repos/HannoverJS/talks/issues?state=open&labels=Upcoming%20Talk'

const talkRegExp = /^#{5} (.+)(?:\s+#{6} (.+))?(?:\s+#{6} \[(.+)]\((.+)\))?\s+([\s\S]+)\s*$/

function extractTalk(body) {
  const talk = body.match(talkRegExp)

  if (!talk) {
    return null
  }

  const [
    name = null,
    occupation = null,
    socialName = null,
    socialUrl = null,
    description = null
  ] = talk

  return {
    name,
    occupation,
    socialName,
    socialUrl,
    description
  }
}

exports.handler = async (_event, _context, callback) => {
  const issues = await fetch(GITHUB_ISSUES_API)

  const talks = camelizeKeys(issues)
    .filter(
      ({ milestone }) =>
        Boolean(milestone) &&
        new Date(milestone.dueOn).valueOf() > new Date().valueOf()
    )
    .reduce(
      (
        acc,
        {
          title,
          body,
          user: { avatarUrl },
          milestone: { dueOn },
          updatedAt,
          labels
        }
      ) => {
        const date = new Date(dueOn)
        date.setDate(date.getDate() - 1)
        date.setHours(19)

        const talk = extractTalk(body)

        if (!talk) {
          return acc
        }

        const { name, occupation, socialName, socialUrl, description } = talk

        const lightningTalkLabelName = 'Lightning Talk'
        const isLightningTalk = labels.some(
          label => label.name === lightningTalkLabelName
        )

        return [
          ...acc,
          decamelizeKeys({
            title,
            description,
            date,
            updatedAt,
            isLightningTalk,
            labels: labels.filter(obj => obj.name !== lightningTalkLabelName),
            speaker: {
              name,
              avatarUrl,
              occupation,
              socialName,
              socialUrl
            }
          })
        ]
      },
      []
    )

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(talks)
  })
}
