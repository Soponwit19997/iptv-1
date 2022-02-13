const { logger, db, file } = require('../../core')
const _ = require('lodash')

const PUBLIC_DIR = process.env.PUBLIC_DIR || '.gh-pages'

async function main() {
  await db.streams.load()
  let streams = await db.streams.find({})
  streams = _.sortBy(streams, 'channel_id')
  streams = streams.map(stream => {
    return {
      channel: stream.channel,
      title: stream.title,
      url: stream.url,
      http_referrer: stream.http_referrer,
      user_agent: stream.user_agent,
      is_online: stream.is_online,
      width: stream.width,
      height: stream.height,
      bitrate: stream.bitrate
    }
  })

  await file.create(`${PUBLIC_DIR}/streams.json`, JSON.stringify(streams))
}

main()
