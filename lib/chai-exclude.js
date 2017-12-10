module.exports = (chai, utils) => {
  const Assertion = chai.Assertion

  /**
   * Remove keys from an object and return a new object.
   *
   * @param  {Object} obj    The object to remove keys
   * @param  {Array}  props  Array of keys to remove
   * @return {Object}
   */
  function removeKeys (obj, props, recursive = false) {
    const res = {}
    const keys = Object.keys(obj)
    const isRecursive = !!recursive

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val = obj[key]

      if (isRecursive && (val instanceof Object && !Array.isArray(val))) {
        res[key] = removeKeys(val, props, recursive)
      } else if (props.indexOf(key) === -1) {
        res[key] = val
      }
    }

    return res
  }

  /**
   * Override standard assertEqual method to remove the keys from the
   * other part of the equation.
   *
   * @param   {Object}    _super
   * @returns {Function}
   */
  function assertEqual (_super) {
    return function (val) {
      if (utils.type(val).toLowerCase() === 'object') {
        if (utils.flag(this, 'excluding')) {
          val = removeKeys(val, utils.flag(this, 'excludingProps'))
        } else if (utils.flag(this, 'excludingEvery')) {
          val = removeKeys(val, utils.flag(this, 'excludingProps'), true)
        }
      }

      _super.apply(this, arguments)
    }
  }

  /**
   * Add a new method 'excluding' to the assertion library.
   */
  Assertion.addMethod('excluding', function (props) {
    utils.expectTypes(this, ['object'])

    const obj = this._obj

    // If exclude parameter is not provided
    if (!props) {
      return this
    }

    if (typeof props === 'string') {
      props = [props]
    }

    this._obj = removeKeys(obj, props)

    utils.flag(this, 'excluding', true)
    utils.flag(this, 'excludingProps', props)

    return this
  })

  /**
   * Add a new method 'excludingEvery' to the assertion library.
   */
  Assertion.addMethod('excludingEvery', function (props) {
    utils.expectTypes(this, ['object'])

    const obj = this._obj

    // If exclude parameter is not provided
    if (!props) {
      return this
    }

    if (typeof props === 'string') {
      props = [props]
    }

    this._obj = removeKeys(obj, props, true)

    utils.flag(this, 'excludingEvery', true)
    utils.flag(this, 'excludingProps', props)

    return this
  })

  Assertion.overwriteMethod('eq', assertEqual)
  Assertion.overwriteMethod('equal', assertEqual)
  Assertion.overwriteMethod('equals', assertEqual)
}
