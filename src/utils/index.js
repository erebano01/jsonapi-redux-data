import camelCase from 'lodash/fp/camelCase';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { plural, singular } from 'pluralize';

let store = null;

export const pluralCamel = item => plural(camelCase(item));
export const singularCamel = item => singular(camelCase(item));

export function getIncludeList(action) {
  const { include, pathname } = action;
  return uniq(
    (include || '')
      .split(',')
      .join('.')
      .split('.')
      .concat(pathname)
      .map(i => pluralCamel(i))
  );
}

export function getIncludeFilterAndId(i, f, id) {
  let includeString = '';
  let filterString = '';
  let idString = '';
  if (f) {
    filterString += `${i ? `&` : `?`}filter=${f}`;
  }
  if (i) {
    includeString = `?include=${i}`;
  }
  if (id) {
    idString = `/${id}`;
  }
  return { includeString, filterString, idString };
}

export const combineMerge = (destinationArray, sourceArray, options) => {
  return sourceArray;
};
export const overwriteMerge = (destinationArray, sourceArray, options) => {
  return uniqBy(destinationArray.concat(...sourceArray), 'id');
};

export function setStore(s) {
  store = s;
}

export function getStore() {
  return store;
}

export * from 'utils/apiUtils';
export * from 'utils/jsonApiUtils';
