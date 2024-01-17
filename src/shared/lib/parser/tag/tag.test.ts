import { ParserStates, TokenTypes } from '../consts';
import { tag } from './tag';

describe('tag', () => {
  test('Works', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

    const parser = xmlTag('<div>');

    let res;
    let error;

    parser
      .next()
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toEqual({ type: 'XML', value: '<div>' });
    expect(error).toBe(undefined);
  });

  test('Works stream', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

    const parser = xmlTag('<d');

    let res;
    let error;

    parser
      .next()
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);

    parser
      .next('iv')
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);

    parser
      .next('>')
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toEqual({ type: 'XML', value: '<div>' });
    expect(error).toBe(undefined);
  });

  test('Stream error data', () => {
    const xmlTag = tag(['<', /[a-z]/, /[a-z]/, /[a-z]/, '>'], { token: TokenTypes.XML });

    const parser = xmlTag('<d');

    let res;
    let error;

    parser
      .next()
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);

    parser
      .next('iv')
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).toBe(undefined);

    parser
      .next('<')
      .value.then((v) => (res = v))
      .catch((e) => (error = e));

    expect(res).toBe(ParserStates.EXPECT_NEW_INPUT);
    expect(error).not.toBe(undefined);
  });
});
