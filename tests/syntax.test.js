/* eslint-disable max-classes-per-file */

describe('should work', () => {
  it('@babel/plugin-syntax-decorators', async () => {
    const prefix = 'prefix-';

    const addPrefix = value => (parent, methodNamwe, descriptor) => {
      const originalFn = descriptor.value;
      descriptor.value = function newDescriptorValue(...args) {
        return value + originalFn.apply(this, args);
      };
    };

    class Thing {
      @addPrefix(prefix)
      static getKey() {
        return 'yay';
      }
    }

    expect(Thing.getKey()).toBe(`${prefix}yay`);
  });

  it('@babel/plugin-proposal-function-bind', async () => {
    class Thing {
      key = 'something';
    }

    function printKey() {
      return this.key;
    }

    const instance = new Thing();

    expect(instance::printKey()).toBe('something');
  });
});
