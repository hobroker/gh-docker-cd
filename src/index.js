/* eslint-disable no-console */

const decorator = Class => {
  Class.thing = 'in constructor';
};

// @babel/plugin-syntax-decorators
@decorator
class Something {
  // @babel/plugin-proposal-class-properties
  thing = 'in prototype';

  // @babel/plugin-proposal-throw-expressions
  constructor(weight = throw new Error('weight is required')) {
    this.weight = weight;
  }
}

function printThing() {
  console.log(this.thing);
  console.log(this.constructor.thing);
}

const instance = new Something(11);

// @babel/plugin-proposal-function-bind
instance::printThing();

// @babel/plugin-proposal-optional-chaining
const obj = { a: { b: { c: 1 } } };
console.log('obj.a.b = ', obj.a?.b?.c);
console.log('obj.a.b.c.d = ', obj.a?.b?.c?.d);
console.log('obj.a.b.c.d.e.f = ', obj.a?.b?.c?.d?.e?.f);

// @babel/plugin-proposal-nullish-coalescing-operator
console.log(null ?? 'default');
console.log('one' ?? 'default');

// @babel/plugin-proposal-export-default-from
// export X from './X'

// @babel/plugin-transform-runtime
// run `npm run build` and check the output in /build

export default Something;
