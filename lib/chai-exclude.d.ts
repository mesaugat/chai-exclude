/// <reference types="chai" />

declare module "chai-exclude" {
  function chaiExclude(chai: any, utils: any): void;

  export = chaiExclude;
}

declare namespace Chai {
  interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
    excluding(props: string | string[]): Assertion;
    excludingEvery(props: string | string[]): Assertion;
  }

  interface Assert {
    /**
     * Deep equal objects excluding some top level properties.
     *
     * @param actual    Actual value.
     * @param expected  Potential expected value.
     * @param props     Properties or keys to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcluding<T>(actual: T, expected: T, props: keyof T | (keyof T)[], message?: string): void;

    /**
     * Deep equal array of objects excluding some top level properties.
     *
     * @param actual    Array of objects.
     * @param expected  Expected array of objects.
     * @param props     String or string of arrays to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcluding<T>(actual: T[], expected: T[], props: string | string[], message?: string): void;

    /**
     * Deep equal objects excluding properties any level deep.
     *
     * @param actual    Actual value.
     * @param expected  Potential expected value.
     * @param props     Properties or keys to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcludingEvery<T>(actual: T, expected: T, props: keyof T | (keyof T)[], message?: string): void;

    /**
     * Deep equal array of objects excluding properties any level deep.
     *
     * @param actual    Array of objects.
     * @param expected  Expected array of objects.
     * @param props     String or string of arrays to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcludingEvery<T>(actual: T[], expected: T[], props: string | string[], message?: string): void;
  }
}
