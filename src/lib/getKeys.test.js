import { expect } from 'chai';
import { getKeys } from './getKeys.js';

describe('getKeys', () => {
  it('gets keys from object', () => {
    const obj = {
      a: true,
      b: { c: true },
    };

    expect(getKeys(obj)).to.deep.equal(['a', 'b', 'c']);
  });

  it('gets keys from array', () => {
    const obj = [
      {
        a: true,
        b: { c: true },
      },
      {
        d: [{ h: true }],
        e: { c: true },
        j: false,
      },
    ];

    expect(getKeys(obj)).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'j', 'h']);
  });

  it('returns [] when primitive', () => {
    expect(getKeys(true)).to.deep.equal([]);
    expect(getKeys(false)).to.deep.equal([]);
    expect(getKeys('lorem')).to.deep.equal([]);
    expect(getKeys(1)).to.deep.equal([]);
  });
});
