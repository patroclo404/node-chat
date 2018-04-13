var expect = require('expect');

var { isValidString } = require('./utils');

describe('isValidString', () => {

  it('should reject no string value', () => {
    var object = { foo : 'foo' };
    var result = isValidString(object);
    expect(result).toBe(false);
  });
  it('should reject empty value', () => {
    var empty = '';
    var result = isValidString(empty);
    expect(result).toBe(false);
  });
  it('should alow a strin non-space characters', () => {
    var string = 'abc';
    var result = isValidString(string);
    expect(result).toBe(true);
  });

});