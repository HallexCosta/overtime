import http from 'http'
import { pipeline} from 'stream/promises'

import logger from '@common/logger'
import { RoutesCore } from '@core/routes'

interface Pipeline {
  run(request: http.IncomingMessage, response: http.ServerResponse): Promise<void>
}
export default class HTTPPipeline implements Pipeline {
  constructor(private readonly routes: RoutesCore) {}

  async *pipelineHandler(
    source: http.IncomingMessage,
    destination: http.ServerResponse
  ): AsyncGenerator {
    source.setEncoding('utf8')

    const endpoint = this.routes.findEndpoint(
      source.method,
      source.url
    )

    if (!endpoint) {
      throw new Error(`The endpoint ${source.method} "${source.url}" not found`)
    }
    
    for await (const data of endpoint.handler(source)) {
      yield data
    }

    //yield "I'm alive!"
  }

  async run(
    request: http.IncomingMessage,
    response: http.ServerResponse
  ): Promise<void> {
    try {
      await pipeline(
        request,
        this
          .pipelineHandler
          .bind(this),
        response,
      )
    } catch(e) {
      logger.error(e.message)
    }
  }  
}
