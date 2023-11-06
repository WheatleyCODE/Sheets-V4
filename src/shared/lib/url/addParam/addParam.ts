export const addParam = (path: string, param: string, value: unknown) => {
  return `${path}?${param}=${JSON.stringify(value)}`;
};
