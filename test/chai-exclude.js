const expect = require('chai').expect

describe('chai-exclude', () => { // eslint-disable-line

  describe('excluding', () => {
    it('should exclude a key from the object', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding('a').to.deep.equal({ b: 'b', c: 'c' })
    })

    it('should also exclude a key from the other object', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding('a').to.deep.equal({ a: 'z', b: 'b', c: 'c' })
    })

    it('should exclude an array of keys from the object', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding(['a', 'c']).to.deep.equal({ b: 'b' })
    })

    it('should also exclude an array of keys from the other object', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding(['a', 'c']).to.deep.equal({ a: 'z', b: 'b' })
      expect({ a: 'a', b: 'b', c: 'c' }).excluding(['a', 'c']).to.deep.equal({ a: 'z', b: 'b', c: 'c' })
    })

    it('should exclude nothing from the object if no keys are provided', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding().to.deep.equal({ a: 'a', b: 'b', c: 'c' })
    })

    it('should exclude nothing from the object if no matching keys are provided', () => {
      expect({ a: 'a', b: 'b' }).excluding('x').to.deep.equal({ a: 'a', b: 'b' })
      expect({ a: 'a', b: 'b' }).excluding(['x', 'y']).to.deep.equal({ a: 'a', b: 'b' })
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

  describe('excludingEvery', () => {
    // Initial object that we will remove properties from
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
      // Expected object can still have the properties that are excluded, it
      // will be removed from comparison
      const expectedObj = {
        a: 'z',
        b: 'b',
        c: {
          b: {
            d: {
              a: 'z',
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
          a: 'a'
        },
        d: ['a', 'c']
      }

      expect(initialObj).excludingEvery('b').to.deep.equal(expectedObj)
    })

    it('should exclude no keys from a given object when only value for key is an object', () => {
      const expectedObj = {
        a: 'a',
        b: 'b',
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
            a: 'a'
          }
        }
      }

      expect(initialObj).excludingEvery('d').to.deep.equal(expectedObj)
    })

    it('should exclude an array of keys from multiple levels of a given object', () => {
      const expectedObj = {}

      expect(initialObj).excludingEvery(['a', 'b', 'c', 'd']).to.deep.equal(expectedObj)
    })

    it('should exclude keys from objects inside of arrays', () => {
      const obj = {
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
        d: ['a', 'c'],
        e: [
          {
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
          null,
          1,
          'string',
          [
            {
              a: 'a',
              b: {
                a: 'a',
                c: null,
                d: 'd'
              }
            }
          ]
        ]
      }

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
        d: ['a', 'c'],
        e: [
          {
            b: {
              d: {
                b: 'b',
                d: null
              }
            }
          },
          null,
          1,
          'string',
          [
            {
              b: {
                c: null,
                d: 'd'
              }
            }
          ]
        ]
      }

      expect(obj).excludingEvery('a').to.deep.equal(expectedObj)
    })

    it('should exclude nothing from the object if no keys are provided', () => {
      expect(initialObj).excludingEvery().to.deep.equal(initialObj)
    })

    it('should exclude nothing from the object if no matching keys are provided', () => {
      expect(initialObj).excludingEvery('x').to.deep.equal(initialObj)
      expect(initialObj).excludingEvery(['x', 'y']).to.deep.equal(initialObj)
    })
  })

})  // eslint-disable-line
