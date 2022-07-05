import cookieParserMiddleware from '../main'

describe('cookie parser middleware', () => {
  it('should return middleware functions', () => {
    const result = cookieParserMiddleware()

    expect(result).toHaveProperty('before')
  })
})