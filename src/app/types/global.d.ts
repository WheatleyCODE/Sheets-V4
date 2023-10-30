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

interface ObjectConstructor {
  isTruly(value: any): boolean;
  isAsyncIterable(value: any): value is AsyncIterable<unknown>;
  isIterable(value: any): value is Iterable<unknown>;
  cast<T = unknown>(value: any): T;
}
