import { OptionalRecord } from 'shared/lib/ts-utils';

export const getQueryParams = (params: OptionalRecord<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);

  for (const [name, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(name, value);
    }
  }

  return `?${searchParams.toString()}`;
};

export const addQueryParams = (params: OptionalRecord<string, string>) => {
  window.history.pushState(null, '', getQueryParams(params));
};
