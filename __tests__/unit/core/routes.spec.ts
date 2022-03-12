import assert from 'assert'

import Routes from '@core/routes'
import { instanceOf } from '../util'

describe('@Routes', () => {
  describe('#create', () => {
    it('should be create Routes instance', () => {
      const routes = Routes.create()

      assert.ok(instanceOf(routes, Routes))
    })
  })

  describe('#get', () => {
    it('should store method type, url path and handler callback', () => {
      const routes = Routes.create()

      const requestHandlerMocked =  async function *() {}
      const endpointMocked = {
        method: 'GET',
        path: '/example',
        handler: requestHandlerMocked
      }

      routes.get('/example', requestHandlerMocked)

      assert.deepStrictEqual(
        endpointMocked,
        routes['endpoints'][0]
      )
    })
  })

  describe('#post', () => {
    it('should store method type, url path and handler callback', () => {
      const routes = Routes.create()

      const requestHandlerMocked =  async function *() {}
      const endpointMocked = {
        method: 'POST',
        path: '/example',
        handler: requestHandlerMocked
      }

      routes.post('/example', requestHandlerMocked)

      assert.deepStrictEqual(
        endpointMocked,
        routes['endpoints'][0]
      )
    })
  })

  describe('#delete', () => {
    it('should store method type, url path and handler callback', () => {
      const routes = Routes.create()

      const requestHandlerMocked =  async function *() {}

      const endpointMocked = {
        method: 'DELETE',
        path: '/example',
        handler: requestHandlerMocked
      }

      routes.delete('/example', requestHandlerMocked)

      assert.deepStrictEqual(
        endpointMocked,
        routes['endpoints'][0]
      )
    })
  })

  describe('#findEndpoint', () => {
    it('should find endpoint that is equal a method and url from request', () => {
      const routes = Routes.create()

      const requestHandlerMocked =  async function *() {}

      const endpointMocked = {
        handler: requestHandlerMocked,
        path: '/example',
        method: 'POST'
      }
      
      routes['endpoints'].push(endpointMocked)

      const endpoint = routes.findEndpoint('POST', '/example')

      assert.deepStrictEqual(
        endpoint,
        endpointMocked
      )
    })
  })
})
