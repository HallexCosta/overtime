import http from 'http'

export interface RoutesCore {
  findEndpoint(method: string, url: string): EndpointHandler | null
  get(path: string, callback: RequestHandler): Routes
  post(path: string, callback: RequestHandler): Routes
  delete(path: string, callback: RequestHandler): Routes
  attach(method: string, path: string, callback: RequestHandler): Routes
}

export type RouteHandlerParams = {
  request: http.IncomingMessage
  response: http.ServerResponse
}

export type RequestHandlerResponse = AsyncGenerator<string>
export type RequestHandler = (
  source: http.IncomingMessage
) => RequestHandlerResponse

type EndpointHandler = {
  method: string
  path:  string,
  handler: RequestHandler
}

export default class Routes implements RoutesCore {
  public readonly baseURI: string
  private readonly endpoints: EndpointHandler[] = []

  protected constructor() {}

  static create(): RoutesCore {
    return new Routes()
  }

  public get(
    path: string,
    handler: RequestHandler
  ): Routes {
    const method = this.get.name.toUpperCase()
    return this.attach(
      method,
      path, 
      handler 
    )
  }
  public post(
    path: string,
    handler: RequestHandler
  ): Routes {
    const method = this.post.name.toUpperCase()
    return this.attach(
      method,
      path, 
      handler 
    )
  }
  public delete(
    path: string,
    handler: RequestHandler
  ): Routes {
    const method = this.delete.name.toUpperCase()
    return this.attach(
      method,
      path, 
      handler 
    )
  }
  public attach(
    method: string,
    path: string,
    handler: RequestHandler
  ): Routes {
    this.endpoints.push({
      path,
      method,
      handler
    })
    return this
  }

  public findEndpoint(method: string, url: string): EndpointHandler | null {
    return this.endpoints
      .find(
        endpoint => 
          endpoint.method
            .includes(method)
          && endpoint.path
            .includes(url)
      )
  }
}
