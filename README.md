<div align="center">
  <h1>Middy AWS cookie parsing middleware</h1>
  <img alt="Middy logo" src="https://raw.githubusercontent.com/wingleung/middy-cookie-parser/main/docs/img/middy-logo.svg"/>
  <p><strong>AWS cookie parsing middleware for the middy framework</strong></p>
</div>
<p>
  <a href="https://github.com/wingleung/middy-cookie-parser/actions/workflows/test.yml">
    <img src="https://github.com/wingleung/middy-cookie-parser/actions/workflows/test.yml/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/wingleung/middy-cookie-parser" style="max-width:100%;">
  </a>
  <a href="https://www.npmjs.com/package/middy-cookie-parser?activeTab=versions">
    <img src="https://badge.fury.io/js/middy-cookie-parser.svg" alt="npm version" style="max-width:100%;">
  </a>
  <a href="https://packagephobia.com/result?p=middy-cookie-parser">
    <img src="https://packagephobia.com/badge?p=middy-cookie-parser" alt="npm install size" style="max-width:100%;">
  </a>
  <a href="https://snyk.io/test/github/wingleung/middy-cookie-parser">
    <img src="https://snyk.io/test/github/wingleung/middy-cookie-parser/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/wingleung/middy-cookie-parser" style="max-width:100%;">
  </a>
</p>

Install

```shell
npm install middy-aws-cookie-parser --save
```

Usage

```typescript
import type { APIGatewayEventWithCookie } from 'middy-cookie-parser'

import middy from '@middy/core'
import CookieParser from 'middy-aws-cookie-parser'

async function baseHandler(event: Partial<APIGatewayEventWithCookie>) {
  
  // event.cookies is available as a parsed cookie jar
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      event.cookies
    )
  }
}

const handler = middy(baseHandler)
  .use(CookieParser())
```