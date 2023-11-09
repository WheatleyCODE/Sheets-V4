import { lastnameValidator } from './lastnameValidator';
import { LastnameValidErrors } from './lastnameValidator.consts';

describe('lastnameValidator', () => {
  test('Valid cases', () => {
    expect(lastnameValidator('Бажаев')).toBe(null);
    expect(lastnameValidator('Пупкин')).toBe(null);
    expect(lastnameValidator('Распутин')).toBe(null);
  });

  test('Invalid cases', () => {
    expect(lastnameValidator('ВЩ')).toBe(LastnameValidErrors.MIN);
    expect(lastnameValidator('D')).toBe(LastnameValidErrors.MIN);
    expect(lastnameValidator('some random string for tests')).toBe(LastnameValidErrors.MAX);
    expect(lastnameValidator('123456789012345678mylastname')).toBe(LastnameValidErrors.MAX);
  });

  test('Empty cases', () => {
    expect(lastnameValidator('')).toBe(LastnameValidErrors.EMPTY);
    expect(lastnameValidator(' ')).toBe(LastnameValidErrors.MIN);
  });
});
