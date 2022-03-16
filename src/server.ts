// localhost:333/extra-works
// localhost:333/users?id={user_id}
import 'dotenv/config'
import http from 'http'

import logger from '@common/logger'
import Routes, { RequestHandlerResponse }  from '@core/routes'
import HTTPPipeline from '@core/pipeline'

const APP_NAME = process.env.APP_NAME
const PORT = process.env.PORT || 3333
const ENDPOINT_DEAFULT_MESSAGE = "I'm alive!"

const handlerStart = () => logger.info(
  `> Listening server on port ${PORT}`
)

async function handlerRequest(
  request: http.IncomingMessage,
  response: http.ServerResponse
) {
  const extraWorkController = new class {
    async *index(source:  http.IncomingMessage): RequestHandlerResponse {
      logger.info(`> Endpoint ${source.method} "${source.url}"`)
      logger.info('> Access method: ExtraWorkController.index')
      for await (const data of source) {
        yield data
      }
    }
  }

  const routes = Routes.create()

  routes.post('/dry', extraWorkController.index)
  function *notImplementation(message: string) {
    yield message
  }
  routes.get('/', notImplementation.bind(null, ENDPOINT_DEAFULT_MESSAGE))

  const httpPipeline = new HTTPPipeline(
    routes
  )
  
  await httpPipeline
    .run(request, response)
}

logger.info(
  `> Starting application: ${APP_NAME}`
)

http
  .createServer(handlerRequest)
  .listen(PORT, handlerStart)
