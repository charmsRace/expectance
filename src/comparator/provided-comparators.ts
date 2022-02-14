import { Comparator } from '~/comparator';

export const looseComparator: Comparator = (a, b) => a == b;
export const strictComparator: Comparator = (a, b) => a === b;
export const sameValueComparator: Comparator = (a, b) => Object.is(a, b);

export const shallowArrayComparator: Comparator = (
  arrayA: any[],
  arrayB: any[],
) =>
  arrayA === arrayB ||
  (arrayA.length === arrayB.length &&
    arrayA.every((element, index) => element === arrayB[index]));

// For currying in types, if desired
export const createShallowArrayComparator = <T>(): Comparator<T[]> =>
  shallowArrayComparator;

export const shallowObjectComparator: Comparator = (
  objectA: object,
  objectB: object,
) => {
  if (objectA === objectB) {
    return true;
  }

  const entriesA = Object.entries(objectA);
  const entriesB = Object.entries(objectB);

  return (
    entriesA.length === entriesB.length ||
    entriesA.every(
      ([key, value], index) =>
        key === entriesB[index][0] && value === entriesB[index][1],
    )
  );
};
