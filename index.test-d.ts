import * as chai from 'chai'
import { expectType } from 'tsd';

import '.'
import * as chaiExclude from './chai-exclude'

// @ts-ignore
chai.use(chaiExclude)

const object = { str: 'a', num: 1 }

// BDD API (expect)
expectType<Chai.Assertion>(chai.expect(object).excluding('str'))
expectType<Chai.Assertion>(chai.expect(object).excluding(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery('str'))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery(['str', 'num']))

chai.expect({ a: 1 }).excluding('a').to.deep.equal({ a: 1 })

// Assert API
chai.assert.deepEqualExcluding({ a: 'a', b: 'b' }, { b: 'b' }, 'a')
chai.assert.deepEqualExcludingEvery({ a: 'a', b: 'b' }, { c: 'b' }, 'a')
