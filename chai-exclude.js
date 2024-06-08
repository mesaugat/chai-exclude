const fclone = require('fclone')

function chaiExclude (chai, utils) {
  const assert = chai.assert
  const Assertion = chai.Assertion

  /**
   * Check if the argument is an array.
   *
   * @param   {any}     arg
   * @returns {Boolean}
   */
  function isArray (arg) {
    return Array.isArray(arg)
  }

  /**
   * Check if the argument is an object.
   *
   * @param   {any}      arg
   * @returns {Boolean}
   */
  function isObject (arg) {
    return arg === Object(arg) && Object.prototype.toString.call(arg) !== '[object Array]'
  }

  /**
   * Remove keys from an object or an array.
   *
   * @param   {Object|Array}  val       object or array to remove keys
   * @param   {Array}         props     array of keys to remove
   * @param   {Boolean}       recursive true if property needs to be removed recursively
   * @returns {Object}
   */
  function removeKeysFrom (val, props, recursive = false) {
    // Replace circular values with '[Circular]'
    const obj = fclone(val)

    if (isObject(obj)) {
      return removeKeysFromObject(obj, props, recursive)
    }

    return removeKeysFromArray(obj, props, recursive)
  }

  /**
   * Remove keys from an object and return a new object.
   *
   * @param   {Object}  obj       object to remove keys
   * @param   {Array}   props     array of keys to remove
   * @param   {Boolean} recursive true if property needs to be removed recursively
   * @returns {Object}
   */
  function removeKeysFromObject (obj, props, recursive = false) {
    const res = {}

    for (const [key, val] of Object.entries(obj)) {
      if (props.includes(key)) continue

      if (recursive && isObject(val)) {
        res[key] = removeKeysFromObject(val, props, true)
      } else if (recursive && isArray(val)) {
        res[key] = removeKeysFromArray(val, props, true)
      } else {
        res[key] = val
      }
    }

    return res
  }

  /**
   * Remove keys from an object inside an array and return a new array.
   *
   * @param   {Array}   array     array with objects
   * @param   {Array}   props     array of keys to remove
   * @param   {Boolean} recursive true if property needs to be removed recursively
   * @returns {Array}
   */
  function removeKeysFromArray (array, props, recursive = false) {
    const res = []
    let val = {}

    if (!array.length) {
      return res
    }

    for (let i = 0; i < array.length; i++) {
      if (isObject(array[i])) {
        val = removeKeysFromObject(array[i], props, recursive)
      } else if (isArray(array[i])) {
        val = removeKeysFromArray(array[i], props, recursive)
      } else {
        val = array[i]
      }

      res.push(val)
    }

    return res
  }

  /**
   * Override standard assertion logic method to remove the keys from other part of the equation.
   *
   * @param   {Object}    _super
   * @returns {Function}
   */
  function removeKeysAndAssert (_super) {
    return function (val) {
      const props = utils.flag(this, 'excludingProps')

      if (utils.flag(this, 'excluding')) {
        val = removeKeysFrom(val, props)
      } else if (utils.flag(this, 'excludingEvery')) {
        val = removeKeysFrom(val, props, true)
      }

      // In case of 'use strict' and babelified code
      arguments[0] = val

      return _super.apply(this, arguments)
    }
  }

  /**
   * Keep standard chaining logic.
   *
   * @param   {Object}    _super
   * @returns {Function}
   */
  function keepChainingBehavior (_super) {
    return function () {
      _super.apply(this, arguments)
    }
  }

  /**
   * Add a new method 'deepEqualExcluding' to 'chai.assert'.
   */
  utils.addMethod(assert, 'deepEqualExcluding', function (actual, expected, props, message) {
    new Assertion(actual, message).excluding(props).to.deep.equal(expected)
  })

  /**
   * Add a new method `deepEqualExcludingEvery` to 'chai.assert'.
   */
  utils.addMethod(assert, 'deepEqualExcludingEvery', function (actual, expected, props, message) {
    new Assertion(actual, message).excludingEvery(props).to.deep.equal(expected)
  })

  /**
   * Add a new method 'excluding' to the assertion library.
   */
  Assertion.addMethod('excluding', function (props) {
    utils.expectTypes(this, ['object', 'array'])

    const obj = this._obj

    // If exclude parameter is not provided
    if (!props) {
      return this
    }

    if (typeof props === 'string') {
      props = [props]
    }

    if (!isArray(props)) {
      throw new Error('Excluding params should be either a string or an array')
    }

    this._obj = removeKeysFrom(obj, props)

    utils.flag(this, 'excluding', true)
    utils.flag(this, 'excludingProps', props)
  })

  /**
   * Add a new method 'excludingEvery' to the assertion library.
   */
  Assertion.addMethod('excludingEvery', function (props) {
    utils.expectTypes(this, ['object', 'array'])

    const obj = this._obj

    // If exclude parameter is not provided
    if (!props) {
      return this
    }

    if (typeof props === 'string') {
      props = [props]
    }

    if (!isArray(props)) {
      throw new Error('Excluding params should be either a string or an array')
    }

    this._obj = removeKeysFrom(obj, props, true)

    utils.flag(this, 'excludingEvery', true)
    utils.flag(this, 'excludingProps', props)
  })

  Assertion.overwriteMethod('eq', removeKeysAndAssert)
  Assertion.overwriteMethod('eql', removeKeysAndAssert)
  Assertion.overwriteMethod('eqls', removeKeysAndAssert)
  Assertion.overwriteMethod('equal', removeKeysAndAssert)
  Assertion.overwriteMethod('equals', removeKeysAndAssert)

  Assertion.overwriteChainableMethod('include', removeKeysAndAssert, keepChainingBehavior)
  Assertion.overwriteChainableMethod('contain', removeKeysAndAssert, keepChainingBehavior)
  Assertion.overwriteChainableMethod('contains', removeKeysAndAssert, keepChainingBehavior)
  Assertion.overwriteChainableMethod('includes', removeKeysAndAssert, keepChainingBehavior)
}

module.exports = chaiExclude
module.exports.default = chaiExclude // for Typescript
