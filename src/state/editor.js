import create from 'zustand';
import { fromThrowable } from 'neverthrow';

const safeParse = fromThrowable(JSON.parse);

const prettify = (value) => {
  const operation = fromThrowable((v) =>
    JSON.stringify(JSON.parse(v), null, 4),
  );

  const { value: prettified, isOk } = operation(value);

  return isOk() ? prettified : value;
};

const minify = (value) => {
  const operation = fromThrowable((v) =>
    JSON.stringify(JSON.parse(v), null, 0),
  );

  const { value: prettified, isOk } = operation(value);

  return isOk() ? prettified : value;
};

export const useEditor = create((set, get) => ({
  value: `{"lorem": "ipsum"}`,
  isValid: true,
  setValue: (nextValue) =>
    set({
      value: nextValue,
      isValid: safeParse(nextValue).isOk(),
    }),
  prettify: () => {
    const { value, setValue } = get();

    setValue(prettify(value));
  },
  minify: () => {
    const { value, setValue } = get();

    setValue(minify(value));
  },
}));
