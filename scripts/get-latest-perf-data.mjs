import awsLite from '@aws-lite/client'
import { join, parse } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const jsons = [ 'checksum.json', 'latest-results-parsed.json' ]

async function main () {
  const start = Date.now()

  const aws = await awsLite({ region: 'us-west-2', plugins: [ import('@aws-lite/s3') ] })
  const apiDir = join(__dirname, '..', 'app', 'api')
  const Bucket = 'performanceproduction-assetsbucket-1xqwku8953q8m'

  const publicDir = join(__dirname, '..', 'public')
  mkdirSync(publicDir, { recursive: true })

  const { Body: assets } = await aws.s3.GetObject({ Bucket, Key: 'assets.json' })
  const ops = assets.map(Key => {
    const isJson = Key.endsWith('.json')
    if (isJson && !jsons.includes(Key)) return
    return new Promise((res, rej) => {
      aws.s3.GetObject({ Bucket, Key })
        .then(({ Body: data }) => {
          const root = isJson ? apiDir : publicDir
          const out = isJson ? JSON.stringify(data) : data
          const filepath = join(root, Key)
          const { dir } = parse(filepath)
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
          writeFile(filepath, out).then(res).catch(rej)
        })
        .catch(rej)
    })
  }).filter(Boolean)

  await Promise.all(ops)
  console.log(`Wrote ${ops.length} perf data files in ${Date.now() - start}ms`)
}
main()
