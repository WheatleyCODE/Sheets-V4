export const pipe = <T>(...fns: Function[]): ((arg: T) => T) => {
  return function (arg: T): T {
    return fns.reduce((result, fn) => fn(result), arg);
  };
};
