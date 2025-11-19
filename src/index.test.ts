import { hello } from './index.js';

describe('hello', () => {
  it('should return greeting message', () => {
    expect(hello('World')).toBe('Hello, World!');
  });

  it('should work with different names', () => {
    expect(hello('TinyERP')).toBe('Hello, TinyERP!');
  });
});
