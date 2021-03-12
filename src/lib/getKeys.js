import * as R from 'ramda';

export const getKeys = (data) =>
  R.pipe(
    R.cond([
      [R.is(Array), R.map(getKeys)],
      [
        R.is(Object),
        (x) => {
          const keys = R.keys(x);

          return [...keys, ...getKeys(R.values(x))];
        },
      ],
      [R.T, R.always([])],
    ]),
    R.flatten,
    R.uniq,
    R.sort((a, b) => a - b),
  )(data);
