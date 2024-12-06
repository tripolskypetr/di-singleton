# di-singleton

> Wraps a class constructor to ensure only one instance is created, using lazy initialization and optionally calling an init method if present, while maintaining type safety via TypeScript generics.

## Usage

```tsx
import { singleton } from 'di-singleton';

const Singleton = singleton(class {
  _value = "";

  getValue = () => this._value;

  setValue = (value: string) => this._value = value;

});

const instance1 = new Singleton();
const instance2 = new Singleton();
const instance3 = new Singleton();

instance1.setValue('foo');
instance2.setValue('bar');
instance3.setValue('baz');

console.log(`instance1 value=${instance1.getValue()}`); // instance1 value=baz
console.log(`instance2 value=${instance2.getValue()}`); // instance2 value=baz
console.log(`instance3 value=${instance3.getValue()}`); // instance3 value=baz

```
