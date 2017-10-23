/// <reference types="chai" />

declare global {
    namespace Chai {
        interface Assertion {
            excluding(props: string|string[]): Assertion;
            excludingEvery(props: string|string[]): Assertion;
        }
    }
}

declare function chaiExclude(chai: any, utils: any): void;
export = chaiExclude;
