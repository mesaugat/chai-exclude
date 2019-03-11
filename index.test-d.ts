import {expectType} from 'tsd-check';

import * as chai from 'chai'
import chaiExclude from './lib/chai-exclude'
import '.'

chai.use(chaiExclude);

// BDD API (expect)
const object = { str: 'a', num: 1 }
expectType<Chai.Assertion>(chai.expect(object).excluding('str'))
expectType<Chai.Assertion>(chai.expect(object).excluding(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery('str'))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery(['str', 'num']))
chai.expect({ a: 1 }).excluding('a').to.deep.equal({ a: 1 })

// Assert API
chai.assert.deepEqualExcluding({ a: 'a', b: 'b' }, { b: 'b' }, 'a')
chai.assert.deepEqualExcludingEvery({ a: 'a', b: 'b' }, { c: 'b' }, 'a')
