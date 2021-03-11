import create from 'zustand';
import { fromThrowable } from 'neverthrow';
import jsonPath from 'jsonpath';
import { isEmpty } from '@app/lib/isEmpty.js';

const safeParse = fromThrowable(JSON.parse);

const safeJsonQuery = fromThrowable((text, path) => {
  const obj = JSON.parse(text);
  const filtered = jsonPath.query(obj, path);

  return JSON.stringify(filtered, null, 2);
});

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
  navigationValue: '',
  navigation: '',
  isValid: true,

  setValue: (nextValue) => {
    const { navigation } = get();
    if (navigation.length) return;

    set({
      navigation: '',
      navigationValue: nextValue,
      value: nextValue,
      isValid: safeParse(nextValue).isOk(),
    });
  },

  setNavigation: (nextNavigation) => {
    const { value, navigationValue } = get();
    const { value: nextNavigationValue, isOk } = safeJsonQuery(
      value,
      nextNavigation,
    );

    set({
      navigationValue: isOk() ? nextNavigationValue : navigationValue,
      navigation: nextNavigation,
    });
  },

  prettify: () => {
    const { value, navigation, setValue } = get();

    isEmpty(navigation) && setValue(prettify(value));
  },

  minify: () => {
    const { value, navigation, setValue } = get();

    isEmpty(navigation) && setValue(minify(value));
  },
}));
