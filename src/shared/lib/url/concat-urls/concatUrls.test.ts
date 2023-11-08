import { concatURLs } from './concatUrls';

describe('concatURLs', () => {
  test('One param', () => {
    expect(concatURLs('url')).toBe('url');
    expect(concatURLs('/url')).toBe('/url');
  });

  test('Two params', () => {
    expect(concatURLs('url', 'google')).toBe('url/google');
    expect(concatURLs('/url', '/google')).toBe('/url/google');
  });

  test('Three params', () => {
    expect(concatURLs('url', 'google', 'ru')).toBe('url/google/ru');
    expect(concatURLs('/url', '/google', '/ru')).toBe('/url/google/ru');
  });

  test('Three params', () => {
    expect(concatURLs('url', 'google-google', 'ru')).toBe('url/google-google/ru');
    expect(concatURLs('/url', '/google_google', '/ru')).toBe('/url/google_google/ru');
  });

  test('Three params', () => {
    expect(concatURLs('url', 'google', 'en/ru')).toBe('url/google/en/ru');

    expect(concatURLs('//url', '//google', '//ru')).toBe('//url/google/ru');
    expect(concatURLs('//url/', '//google/', '//ru/')).toBe('//url/google/ru/');
    expect(concatURLs('url///', '//google///', '//ru///')).toBe('url/google/ru/');
  });

  test('Three params', () => {
    expect(concatURLs('url', 'google', 'ru\ru')).toBe('url/google/ru\ru');
    expect(concatURLs('/url', '/google', '/ru\ru')).toBe('/url/google/ru\ru');
  });

  test('Three params', () => {
    expect(concatURLs('url|', 'go-og_l@e', 'ru\\ru')).toBe('url|/go-og_l@e/ru\\ru');
    expect(concatURLs('/ur@$l', '/go||ogle', '/ru\\|ru')).toBe('/ur@$l/go||ogle/ru\\|ru');
  });
});
