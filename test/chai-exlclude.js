const expect = require('chai').expect

describe('chaiExclude', () => {
  it('should exclude a key from the object', () => {
    expect({a: 'a', b: 'b', c: 'c'}).excluding('a').to.deep.equal({ b: 'b', c: 'c' })
  })

  it('should exclude an array of keys from the object', () => {
    expect({a: 'a', b: 'b', c: 'c'}).excluding(['a', 'c']).to.deep.equal({ b: 'b' })
  })
})
