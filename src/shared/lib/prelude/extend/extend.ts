// eslint-disable-next-line @typescript-eslint/ban-types
export const extend = (obj: Function | object, name: string, method: Function | PropertyDescriptor): void => {
  const descriptor: PropertyDescriptor = {
    configurable: true,
  };

  if (typeof method === 'function') {
    descriptor.writable = true;
    descriptor.value = method;
  } else {
    Object.assign(descriptor, method);
  }

  const dictKey = Symbol.for('[[SHEETS_V4]]');

  if (!(dictKey in obj)) {
    Object.defineProperty(obj, dictKey, {
      value: Object.create(null),
    });
  }

  // ! FIX types
  // @ts-ignore
  Object.defineProperty(obj[dictKey], name, descriptor);

  const key = Symbol.for(`[[SHEETS_V4_TRAP:${name}]]`);
  Object.defineProperty(obj, key, descriptor);

  if (obj === Function.prototype || (typeof obj !== 'function' && obj !== Object.prototype)) {
    Object.defineProperty(Object.prototype, key, {
      configurable: true,

      set(val: unknown): void {
        this[name] = val;
      },

      get(): unknown {
        return this[name];
      },
    });
  }

  Object.defineProperty(obj, name, descriptor);
};
