import type middy from '@middy/core'
import type { MiddlewareObj } from '@middy/core'
import type {
  APIGatewayEvent,
  APIGatewayProxyResult,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2
} from 'aws-lambda'

import cookie from 'cookie'

interface APIGatewayEventWithCookie extends APIGatewayEvent {
  cookies: Record<string, string>
}

interface APIGatewayProxyEventV2WithCookie extends Omit<APIGatewayProxyEventV2, 'cookies'> {
  cookies: string[] | Record<string, string>
}

interface RequestWithCookie extends middy.Request<APIGatewayEventWithCookie & APIGatewayProxyEventV2WithCookie, APIGatewayProxyResult & APIGatewayProxyResultV2> {}

const cookieParserMiddleware = ():MiddlewareObj => {
  const cookieParserMiddlewareBefore = async (request: RequestWithCookie) => {
    const { event } = request

    let cookieObject = {}

    // API Gateway V1
    if (event.headers?.Cookie) {
      cookieObject = cookie.parse(event.headers.Cookie)
    }

    // API Gateway V2
    if (
      event.cookies
      && Array.isArray(event.cookies)
    ) {
      cookieObject = event
        .cookies
        .reduce((accumulator, cookieValue) =>
          ({
            ...accumulator,
            ...cookie.parse(cookieValue)
          }),
          {}
        )

    }

    event.cookies = cookieObject
  }

  return {
    before: cookieParserMiddlewareBefore
  }
}

export {
  APIGatewayEventWithCookie,
  APIGatewayProxyEventV2WithCookie,
  RequestWithCookie
}

export default cookieParserMiddleware