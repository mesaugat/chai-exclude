const expect = require('chai').expect

describe('chaiExclude', () => {
  it('should exclude a key from the object', () => {
    expect({ a: 'a', b: 'b', c: 'c' }).excluding('a').to.deep.equal({ b: 'b', c: 'c' })
  })

  it('should exclude an array of keys from the object', () => {
    expect({ a: 'a', b: 'b', c: 'c' }).excluding(['a', 'c']).to.deep.equal({ b: 'b' })
  })

  it('should exclude nothing from the object if no keys are provided', () => {
    expect({ a: 'a', b: 'b', c: 'c' }).excluding().to.deep.equal({ a: 'a', b: 'b', c: 'c' })
  })

  it('should exclude top level key even if it is an object', () => {
    const obj = {
      a: 'a',
      b: 'b',
      c: {
        a: 'a',
        b: {
          a: 'a'
        }
      },
      d: ['a', 'c']
    }

    const expectedObj = {
      a: 'a',
      b: 'b',
      d: ['a', 'c']
    }

    expect(obj).excluding('c').to.deep.equal(expectedObj)
  })
})

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
          d: null
        }
      }
    },
    d: ['a', 'c']
  }

  it('should exclude a key from multiple levels of a given object', () => {
    const expectedObj = {
      b: 'b',
      c: {
        b: {
          d: {
            b: 'b',
            d: null
          }
        }
      },
      d: ['a', 'c']
    }

    expect(initialObj).excludingEvery('a').to.deep.equal(expectedObj)
  })

  it('should exclude a key from multiple levels of a given object when value is not an object', () => {
    const expectedObj = {
      a: 'a',
      c: {
        a: 'a',
        b: {
          a: 'a',
          d: {
            a: 'a',
            d: null
          }
        }
      },
      d: ['a', 'c']
    }

    expect(initialObj).excludingEvery('b').to.deep.equal(expectedObj)
  })

  it('should exclude no keys from a given object when only value for key is an object', () => {
    const expectedObj = {
      a: 'a',
      b: 'b',
      c: {
        a: 'a',
        b: {
          a: 'a',
          d: {
            a: 'a',
            b: 'b',
            d: null
          }
        }
      },
      d: ['a', 'c']
    }

    expect(initialObj).excludingEvery('c').to.deep.equal(expectedObj)
  })

  it('should exclude a key from multiple levels of a given object when value is an array or null', () => {
    const expectedObj = {
      a: 'a',
      b: 'b',
      c: {
        a: 'a',
        b: {
          a: 'a',
          d: {
            a: 'a',
            b: 'b'
          }
        }
      }
    }

    expect(initialObj).excludingEvery('d').to.deep.equal(expectedObj)
  })

  it('should exclude an array of keys from multiple levels of a given object', () => {
    const expectedObj = {
      c: {
        b: {
          d: {
          }
        }
      }
    }

    expect(initialObj).excludingEvery(['a', 'b', 'c', 'd']).to.deep.equal(expectedObj)
  })

  it('should exclude nothing from the object if no keys are provided', () => {
    expect(initialObj).excludingEvery().to.deep.equal(initialObj)
  })
})
