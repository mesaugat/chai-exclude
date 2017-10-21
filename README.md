# chai-exclude

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

1. Excluding a property from the object

```js
expect({ a: 'a', b: 'b' }).excluding('a').to.equal({ b: 'b' });
```

2. Excluding multiple properties from the object

```js
expect({ a: 'a', b: 'b', c: 'c' }).excluding(['a', 'b']).to.equal({ c: 'c' });
```

## License

[MIT](LICENSE)
