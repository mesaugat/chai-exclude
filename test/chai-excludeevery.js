const expect = require('chai').expect

describe('chaiExcludeEvery', () => {
  // Initial object that we will remove properties from across all tests
  const initialObj = {
    a: 'a',
    b: 'b',
    c: {
      a: 'a',
      b: {
        a: 'a',
        d: {
          a: 'a',
          b: 'b',
          e: null
        }
      },
      c: 'c'
    },
    d: ['a', 'c'],
    e: {
      c: 'c'
    }
  }

  it('should exclude a key from multiple levels of a given object', () => {    
    const expectedObj = {
      b: 'b',
      c: {
        b: {
          d: {
            b: 'b',
            e: null
          }
        },
        c: 'c'
      },
      d: ['a', 'c'],
      e: {
        c: 'c'
      }
    }

    expect(initialObj).excludingEvery('a').to.deep.equal(expectedObj)
  })
})
