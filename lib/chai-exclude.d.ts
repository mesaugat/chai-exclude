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
}
