import { OptionalRecord } from '../../ts-utils';

export const addQueryParams = (params: OptionalRecord<string, string>, isSaveHistory = false) => {
  const searchParams = new URLSearchParams(window.location.search);

  for (const [name, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(name, value);
    }
  }

  const result = `?${searchParams.toString()}`;

  if (isSaveHistory) window.history.pushState(null, '', result);

  return result;
};
