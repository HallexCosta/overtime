// localhost:333/extra-works
// localhost:333/users?id={user_id}
import 'dotenv/config'
import http from 'http'
import { pipeline } from 'stream/promises'

import logger from '@common/logger'

const APP_NAME = process.env.APP_NAME
const PORT = process.env.PORT || 3333

const handlerStart = () => console.log(
  `> Listening server on port ${PORT}`
)

async function handlerRequest(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  if (request.method) {
    if (request.url.includes('/users'))
      logger.info('> Access endpoint GET /users')
    if (request.url.includes('/extra-works'))
      logger.info('> Access endpoint GET extra-works')
  }

  await pipeline(
    request,
    async function *(source: any) {
      source.setEncoding('utf8')

      for await (const data of source) {
        console.log(data)
      }

      response.end("I'm alive!")
    },
    response
  )
}

logger.info(`> Starting application: ${APP_NAME}`)

http
  .createServer(handlerRequest)
  .listen(PORT, handlerStart)
