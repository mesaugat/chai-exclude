/* eslint-env mocha */

const { use, assert, expect } = require('chai')

const chaiExclude = require('./chai-exclude')

use(chaiExclude)

describe('chai-exclude', () => {
  /**
   * Uses the same 'excluding' Assertion API underneath, thus the fewer amount of tests.
   */
  describe('assert.deepEqualExcluding', () => {
    it('should exclude key(s) from comparison', () => {
      assert.deepEqualExcluding({ a: 'a', b: 'b', c: 'c' }, { b: 'b', c: 'c' }, 'a')
      assert.deepEqualExcluding({ a: 'a', b: 'b', c: 'c' }, { c: 'c' }, ['a', 'b'])
      assert.deepEqualExcluding([{ a: 'a', b: 'b', c: 'c' }], [{ c: 'c' }], ['a', 'b'])
    })
  })

  /**
   * Uses the same 'excludingEvery' Assertion API underneath, thus the fewer amount of tests.
   */
  describe('assert.deepEqualExcludingEvery', () => {
    it('should exclude key(s) from comparison', () => {
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

      const expectedObj1 = {
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

      const expectedObj2 = {
        c: {},
        d: ['a', 'c'],
        e: [
          {},
          null,
          1,
          'string',
          [
            {}
          ]
        ]
      }

      assert.deepEqualExcludingEvery(initialObj, expectedObj1, 'a')
      assert.deepEqualExcludingEvery(initialObj, expectedObj2, ['a', 'b'])
    })

    it('should exclude circular reference key(s) from comparison', () => {
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

      const expectedObj1 = {
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

      const expectedObj2 = {
        c: {},
        d: ['a', 'c'],
        e: [
          {},
          null,
          1,
          'string',
          [
            {}
          ]
        ]
      }

      // Create circular references.
      initialObj.e = initialObj
      expectedObj1.e = expectedObj1
      expectedObj2.e = expectedObj2

      initialObj.c.e = initialObj
      expectedObj1.c.e = expectedObj1
      expectedObj2.c.e = expectedObj2

      assert.deepEqualExcludingEvery(initialObj, expectedObj1, 'a')
      assert.deepEqualExcludingEvery(initialObj, expectedObj2, ['a', 'b'])
    })
  })

  describe('expect.excluding', () => {
    it('should exclude a key from the object', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding('a').to.deep.equal({ b: 'b', c: 'c' })
    })

    it('should exclude a key from the object and eql/eqls alias is used', () => {
      expect({ a: 'a', b: 'b', c: 'c' }).excluding('a').to.eql({ b: 'b', c: 'c' })
      expect({ a: 'a', b: 'b', c: 'c' }).excluding('a').to.eqls({ b: 'b', c: 'c' })
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
      const initialObj = {
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

      expect(initialObj).excluding('c').to.deep.equal(expectedObj)
    })

    it('should exclude top level key(s) from array of objects', () => {
      expect([{ a: 'a', b: 'b', c: 'c' }]).excluding('a').to.deep.equal([{ b: 'b', c: 'c' }])
      expect([{ a: 'a', b: 'b', c: 'c' }]).excluding(['a', 'b']).to.deep.equal([{ c: 'c' }])
    })

    it('should exclude top level key from array of objects even if the key is an object', () => {
      const initialArray = [
        {
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
      ]

      const expectedArray = [
        {
          a: 'a',
          b: 'b',
          c: 'z',
          d: ['a', 'c']
        }
      ]

      expect(initialArray).excluding('c').to.deep.equal(expectedArray)
    })

    it('should exclude circular reference key(s) from comparison', () => {
      const initialObj = {
        a: 'a',
        b: 'b',
        d: ['a', 'c']
      }

      const expectedObj = {
        b: 'b',
        d: ['a', 'c']
      }

      // Create circular references
      initialObj.e = initialObj
      expectedObj.e = expectedObj

      expect(initialObj).excluding('a').to.deep.equal(expectedObj)
    })
  })

  describe('expect.excludingEvery', () => {
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

    it('should exclude keys from simple array of objects at the root', () => {
      const initialArray = [
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
        }
      ]

      const expectedArray = [
        {
          b: {
            d: {
              b: 'b',
              d: null
            }
          }
        }
      ]

      expect(initialArray).excludingEvery('a').to.deep.equal(expectedArray)
    })

    it('should exclude key(s) from objects inside of array at the root', () => {
      const initialArray = [
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

      const expectedArray1 = [
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

      const expectedArray2 = [
        {
          b: {
          }
        },
        null,
        1,
        'string',
        [
          {
            b: {
              c: null
            }
          }
        ]
      ]

      expect(initialArray).excludingEvery('a').to.deep.equal(expectedArray1)
      expect(initialArray).excludingEvery(['a', 'd']).to.deep.equal(expectedArray2)
    })

    it('should exclude circular reference key(s) from comparison', () => {
      const initialObj = {
        a: 'a',
        b: 'b',
        d: ['a', 'c']
      }

      const expectedObj = {
        b: 'b',
        d: ['a', 'c']
      }

      // Create circular references
      initialObj.e = initialObj
      initialObj.d.push(initialObj)

      expectedObj.e = expectedObj
      expectedObj.d.push(expectedObj)

      expect(initialObj).excludingEvery('a').to.deep.equal(expectedObj)
    })

    it('should exclude nothing from the object if no keys are provided', () => {
      expect(initialObj).excludingEvery().to.deep.equal(initialObj)
    })

    it('should exclude nothing from the object if no matching keys are provided', () => {
      expect(initialObj).excludingEvery('x').to.deep.equal(initialObj)
      expect(initialObj).excludingEvery(['x', 'y']).to.deep.equal(initialObj)
    })

    // chai-exclude did not work with eql/eqls alias as reported by @luigidt
    // @see https://github.com/mesaugat/chai-exclude/issues/30
    it('should exclude nothing from the object if no matching keys are provided and eql/eqls is used', () => {
      expect({ a: new Date(0) }).excludingEvery('b').to.be.eql({ a: new Date(0) })
      expect({ a: new Date(0) }).excludingEvery(['b', 'c']).to.be.eqls({ a: new Date(0) })
    })
  })
})
