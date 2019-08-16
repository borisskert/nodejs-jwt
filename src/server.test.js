import test from 'ava'
import { Server } from './server'

const request = require('request-promise-native')

test.before(async t => {
  const server = Server()

  t.context = {
    runningServer: await server.listen(3000)
  }
})

test.after(async t => {
  await t.context.runningServer.close()
})

test('should NOT login with unknown username', async t => {
  const credentials = {
    username: 'aymen1',
    password: '123'
  }

  const loginResponse = await request({
    method: 'POST',
    url: `http://localhost:3000/authenticate`,
    body: credentials,
    json: true,
    resolveWithFullResponse: true,
    simple: false
  })

  t.is(loginResponse.statusCode, 401)
})

test('should NOT get products without login', async t => {
  const productsRequest = await request({
    method: 'GET',
    url: `http://localhost:3000/api/products`,
    json: true,
    resolveWithFullResponse: true,
    simple: false
  }
  )

  t.is(productsRequest.statusCode, 401)
})

test('should get products after login', async t => {
  const credentials = {
    username: 'aymen',
    password: '123'
  }

  const loginResponse = await request({
    method: 'POST',
    url: `http://localhost:3000/authenticate`,
    body: credentials,
    json: true,
    resolveWithFullResponse: true,
    simple: false
  })

  t.is(loginResponse.statusCode, 200)
  t.deepEqual(loginResponse.body.message, 'authentication done')

  const token = loginResponse.body.token

  const productsRequest = await request({
    method: 'GET',
    url: `http://localhost:3000/api/products`,
    headers: { 'access-token': token },
    json: true,
    resolveWithFullResponse: true,
    simple: false
  }
  )

  t.is(productsRequest.statusCode, 200)
  t.deepEqual(productsRequest.body, [
    {
      id: '1',
      name: 'cheese'
    },
    {
      id: '2',
      name: 'carottes'
    }
  ])
})
