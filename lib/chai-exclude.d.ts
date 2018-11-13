/// <reference types="chai" />

declare module "chai-exclude" {
  function chaiExclude(chai: any, utils: any): void;

  export = chaiExclude;
}

declare namespace Chai {
  interface Assertion {
    excluding(props: string | string[]): Assertion;
    excludingEvery(props: string | string[]): Assertion;
  }

  interface Assert {
    /**
     * Asserts that actual is deeply equal to expected excluding some top level properties.
     *
     * @type T          Type of the objects.
     * @param actual    Actual value.
     * @param expected  Potential expected value.
     * @param props     Properties or keys to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcluding<T>(actual: T, expected: T, props: keyof T | keyof T[], message?: string): void;

    /**
     * Asserts that actual is deeply equal to expected excluding properties any level deep.
     *
     * @type T          Type of the objects.
     * @param actual    Actual value.
     * @param expected  Potential expected value.
     * @param props     Properties or keys to exclude.
     * @param message   Message to display on error.
     */
    deepEqualExcludingEvery<T>(actual: T, expected: T, props: keyof T | keyof T[], message?: string): void;
  }
}
