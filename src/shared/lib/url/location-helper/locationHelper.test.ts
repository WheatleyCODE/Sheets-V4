import { Location } from 'react-router-dom';
import { LocationHelper } from './locationHelper';

describe('locationHelper', () => {
  test('Base', () => {
    const location: Location<any> = { hash: '#hash', key: '1234', pathname: '/pathname', search: '?f=true', state: {} };
    const helper = new LocationHelper(location);

    expect(helper.hash).toBe('#hash');
    expect(helper.key).toBe('1234');
    expect(helper.pathname).toBe('/pathname');
    expect(helper.search).toBe('?f=true');
    expect(helper.state).toEqual({});
    expect(helper.getLocation()).toEqual(location);
  });

  test('Hash 1', () => {
    const location: Location<any> = { hash: '', key: '', pathname: '/pathname', search: '', state: {} };

    expect(new LocationHelper(location).addHash('hash').getPath()).toBe('/pathname#hash');
    expect(new LocationHelper(location).addHash('#hash').getPath()).toBe('/pathname#hash');
  });

  test('Hash 2', () => {
    const location: Location<any> = { hash: '#user', key: '', pathname: '/pathname', search: '', state: {} };

    expect(new LocationHelper(location).addHash('hash').getPath()).toBe('/pathname#hash');
    expect(new LocationHelper(location).addHash('#hash').getPath()).toBe('/pathname#hash');
  });

  test('Paths', () => {
    const location: Location<any> = { hash: '#user', key: '', pathname: '/pathname', search: '', state: {} };

    expect(new LocationHelper(location).joinPaths('/login', 'ru').getPath()).toBe('/login/ru#user');
    expect(new LocationHelper(location).joinPaths('login', '/ru').getPath()).toBe('login/ru#user');
    expect(new LocationHelper(location).joinPaths('login///', '///ru').getPath()).toBe('login/ru#user');
  });

  test('Params', () => {
    const location: Location<any> = { hash: '#user', key: '', pathname: '/pathname', search: '?user=true', state: {} };

    expect(new LocationHelper(location).getParam('user')).toBe('true');
  });

  test('Params empty', () => {
    const location: Location<any> = { hash: '#user', key: '', pathname: '/pathname', search: '', state: {} };

    expect(new LocationHelper(location).getParam('user')).toBe(null);
  });

  test('Params add', () => {
    const location: Location<any> = { hash: '#user', key: '', pathname: '/pathname', search: '?user=true', state: {} };

    expect(new LocationHelper(location).addParams({ login: true }).getPath()).toBe(
      '/pathname?user=true&login=true#user',
    );
    expect(new LocationHelper(location).addParams({ login: true, eng: 'ru' }).getPath()).toBe(
      '/pathname?user=true&login=true&eng=%22ru%22#user',
    );
  });

  test('Params set', () => {
    const location: Location<any> = { hash: '#user', key: '', pathname: '/pathname', search: '?user=true', state: {} };

    expect(new LocationHelper(location).setParams({ ok: true }).getPath()).toBe('/pathname?ok=true#user');
    expect(new LocationHelper(location).setParams({ ok: true, login: true }).getPath()).toBe(
      '/pathname?ok=true&login=true#user',
    );
  });

  test('Params delete', () => {
    const location: Location<any> = {
      hash: '#user',
      key: '',
      pathname: '/pathname',
      search: '?user=true&ok=true',
      state: {},
    };

    expect(new LocationHelper(location).deleteParams(['user']).getPath()).toBe('/pathname?ok=true#user');
    expect(new LocationHelper(location).deleteParams(['user', 'ok']).getPath()).toBe('/pathname?#user');
  });

  test('All', () => {
    const location: Location<any> = { hash: '#hash', key: '1234', pathname: '/pathname', search: '?f=true', state: {} };
    const helper = new LocationHelper(location);

    expect(helper.hash).toBe('#hash');
    expect(helper.key).toBe('1234');
    expect(helper.pathname).toBe('/pathname');
    expect(helper.search).toBe('?f=true');
    expect(helper.state).toEqual({});
    expect(helper.getLocation()).toEqual(location);

    helper.addHash('user').addParams({ ok: true }).deleteParams(['f', 'lol']).joinPaths('/login', '///user');
    expect(helper.getPath()).toBe('/login/user?ok=true#user');

    helper.addHash('#modal');
    helper.setParams({ ya: true });
    expect(helper.getPath()).toBe('/login/user?ya=true#modal');
  });
});
