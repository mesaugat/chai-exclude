import * as chai from 'chai'
import { expectType } from 'tsd';

import '.'
import * as chaiExclude from './chai-exclude'

// @ts-ignore
chai.use(chaiExclude)

const object = { str: 'a', num: 1, obj: { str: 'x', num: 2 } }

// BDD API (expect)
expectType<Chai.Assertion>(chai.expect(object).excluding('str'))
expectType<Chai.Assertion>(chai.expect(object).excluding(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery('str'))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingEvery(['str', 'num']))
expectType<Chai.Assertion>(chai.expect(object).excludingNested('obj.str'))
expectType<Chai.Assertion>(chai.expect(object).excludingNested(['obj.str', 'obj.num']))

chai.expect({ a: 1 }).excluding('a').to.deep.equal({ a: 1 })
chai.expect(object).excluding('obj.str').to.deep.equal({ str: 'a', num: 1, obj: { num: 2 } })

// Assert API
chai.assert.deepEqualExcluding({ a: 'a', b: 'b' }, { b: 'b' }, 'a')
chai.assert.deepEqualExcludingEvery({ a: 'a', b: 'b' }, { c: 'b' }, 'a')
chai.assert.deepEqualExcludingNested({ a: 'a', b: 'b' }, { c: 'b' }, 'obj.str')
