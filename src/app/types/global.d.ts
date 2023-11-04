declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare interface FCProps {
  children?: React.ReactNode;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare interface IReduxSchema {
  isLoading: boolean;
  error: string | null;
}

declare const __IS_DEV__: boolean;
declare const __PROJECT__: 'storybook' | 'app' | 'jest';

type Primitive = string | symbol | number | bigint | boolean | undefined | null;

// eslint-disable-next-line @typescript-eslint/ban-types
interface AnyFunction<ARGS extends any[] = any[], R = any> extends Function {
  (...args: ARGS): R;
}

interface ObjectConstructor {
  isAsyncIterable(value: any): value is AsyncIterable<unknown>;
  isIterable(value: any): value is Iterable<unknown>;

  cast<T = unknown>(value: any): T;
  isTruly(value: any): boolean;
  isPrimitive(value: any): value is Primitive;
  isUndef(value: any): value is undefined;
  isNull(value: any): value is null;
  isNullable(value: any): value is null | undefined;
  isString(value: any): value is string;
  isNumber(value: any): value is number;
  isBoolean(value: any): value is boolean;
  isFunction(value: any): value is AnyFunction;
  isPromise(value: any): value is Promise<unknown>;
  isPromiseLike(value: any): value is PromiseLike<unknown>;
  isProxy<T>(value: T): T extends Primitive ? false : boolean;
}
