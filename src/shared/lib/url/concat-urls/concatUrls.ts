const startSlashesRgxp = /^\/+/;
const endSlashesRgxp = /\/+$/;
const isStrictAbsURL = /^\w+:\/\//;

export const concatURLs = (...urls: string[]) => {
  let res = '';

  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];

    if (Object.isNullable(url)) continue;

    url = url.replace(endSlashesRgxp, '/');

    if (isStrictAbsURL.test(url)) {
      res = url;
      continue;
    }

    if (i === 0) {
      res = url.replace(startSlashesRgxp, (str) => str.slice(0, 2));
      continue;
    }

    url = url.replace(startSlashesRgxp, '/');

    if (res === '') {
      res += url;
    } else {
      url = url.replace(startSlashesRgxp, '');
      res += res.endsWith('/') ? url : `/${url}`;
    }
  }

  return res;
};
