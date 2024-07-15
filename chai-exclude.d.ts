/// <reference types="@types/chai" />

declare module 'chai-exclude' {
  export default function chaiExclude(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void;
}

declare namespace Chai {
  interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
    excluding(props: string | string[]): Assertion;
    excludingEvery(props: string | string[]): Assertion;
  }

  interface Assert {
    /**
     * Asserts that actual is deeply equal to expected excluding some top level properties.
     *
     * @param actual    Actual value.
     * @param expected  Expected value.
     * @param props     Properties or keys to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcluding<T>(actual: T | T[], expected: T | T[], props: keyof T | (keyof T)[], message?: string): void;

    /**
     * Asserts that actual is deeply equal to expected excluding properties any level deep.
     *
     * @param actual    Actual value.
     * @param expected  Expected value.
     * @param props     Properties or keys to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcludingEvery<T>(actual: T | T[], expected: T | T[], props: keyof T | (keyof T)[], message?: string): void;
  }
}
