import middy from '@middy/core'
import { mockContextCreator } from 'aws-lambda-test-utils'

import cookieParserMiddleware from '../main'

const context = mockContextCreator(
  {
    functionName: 'LambdaTest',
    functionVersion: '1',
    invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:ci'
  }
)

describe('cookie parser middleware', () => {
  it('should return middleware functions', () => {
    const result = cookieParserMiddleware()

    expect(result).toHaveProperty('before')
  })

  it('should return cookies for api gateway v1', async () => {
    const handler = middy((event) => event)
      .use(cookieParserMiddleware())

    const event = {
      headers: {
        Cookie: 'cookie1=value1;cookie2=value2'
      }
    }
    const response = await handler(event, context)

    expect(response).toEqual({
      cookies: {
        cookie1: 'value1',
        cookie2: 'value2'
      },
      ...event
    })
  })

  it('should return cookies for api gateway v2', async () => {
    const handler = middy((event) => event)
      .use(cookieParserMiddleware())

    const event = {
      cookies: [
        'cookie1=value1',
        'cookie2=value2'
      ]
    }

    const response = await handler(event, context)

    expect(response).toEqual({
      cookies: {
        cookie1: 'value1',
        cookie2: 'value2'
      }
    })
  })
})