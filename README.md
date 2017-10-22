# chai-exclude

[![npm](https://img.shields.io/npm/v/chai-exclude.svg)](https://www.npmjs.com/package/chai-exclude)
[![Build Status](https://travis-ci.org/mesaugat/chai-exclude.svg?branch=master)](https://travis-ci.org/mesaugat/chai-exclude)

Exclude keys before a deep equal operation with [expect](http://chaijs.com/api/bdd/).

## Why?

Sometimes you'll need to exclude object properties that generate unique values while doing a deep equal comparison. This plugin makes it easier to remove those top level properties before comparison.

https://github.com/chaijs/chai/issues/885

## Installation

```bash
npm install chai-exclude --only=dev
```

```bash
yarn add chai-exclude --dev
```

## Usage

```js
const chai = require('chai');
const chaiExclude = require('chai-exclude');

chai.use(chaiExclude);
```

## Example

### a) excluding

1. Excluding a property from an object

```js
expect({ a: 'a', b: 'b' }).excluding('a').to.deep.equal({ b: 'b' })
```

2. Excluding multiple top level properties from an object

```js
const obj = {
  a: 'a',
  b: 'b',
  c: {
    d: 'd',
    e: 'e'
  }
}

expect(obj).excluding(['a', 'c']).to.deep.equal({ b: 'b' })
```

### b) excludingEvery

1. Excluding every property in a deeply nested object

```js
const actual = {
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

const expected = {
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

expect(actual).excludingEvery('a').to.deep.equal(expected)
```

2. Excluding multiple properties in a deeply nested object

```js
const actual = {
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

const expected = {
  b: 'b',
  c: {
    b: {
      d: {      // d is not removed because it is an object
        b: 'b'
      }
    }
  }
}

expect(actual).excludingEvery(['a', 'd']).to.deep.equal(expected)
```

__Note: `excludingEvery` will not remove the property if it is an object in a deeply nested object.__

## Contributing

Contributions are welcome. If you have any questions create an issue [here](https://github.com/mesaugat/chai-exclude/issues).

## License

[MIT](LICENSE)
