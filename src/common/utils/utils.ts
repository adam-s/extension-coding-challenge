import { random } from './maths';

export const delay = <T, U>(
  fn: (...args: Array<T>) => U,
  min: number,
  max: number,
) => {
  return (...args: Array<T>): Promise<U> =>
    new Promise((resolve, reject) => {
      try {
        const delayTime = random(min, max);
        setTimeout(() => {
          resolve(fn.apply({}, args));
        }, delayTime);
      } catch (error) {
        reject(error);
      }
    });
};

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x);
};

// Wrap the postmessage so that there can be a discriminated union
export const postMessage = <T>(message: T): void => {
  chrome.runtime.sendMessage(message);
};

export const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => {
  if (value === null || value === undefined) return false;
  return true;
};

export const removeArrayDuplicates = <T, U extends keyof T>(
  B: T[],
  A: T[],
  key: U,
): T[] => {
  const ids = new Set(A.map((d) => d[key]));
  return [...B.filter((d) => !ids.has(d[key])), ...A];
};

const isNumeric = (value: unknown): value is number => {
  return typeof value === 'number';
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

// https://devexp.io/2019/05/21/filterby-sortby-and-findby-3-type-safe-methods-to-simplify-the-use-of-typescript-arrays/
export const sortByKey = <T, U extends keyof T>(
  A: T[],
  key: U,
  order: 'ASC' | 'DESC' = 'ASC',
): T[] => {
  const sorting = order === 'ASC' ? 1 : -1;
  return A.sort((a1: any, a2: any) => {
    if (!a1) return 1;
    if (!a1[key]) return 1;
    if (!a2) return -1;
    if (!a2[key]) return 1;
    if (isNumeric(a1[key]) && isNumeric(a2[key])) {
      return a1[key] - a2[key] * sorting;
    }
    if (isString(a1[key]) && isString(a2[key])) {
      return (
        a1[key].toLowerCase().localeCompare(a2[key].toLowerCase()) * sorting
      );
    }
    return 0;
  });
};

// https://codesandbox.io/s/draggable-material-ui-oj3wz?file=/src/helpers.ts:28-325
// a little function to help us with reordering the result [Don't need this for our use case]
export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const insureSorted = <T>(A: T[], key: string) =>
  A.map<T>((a, index) => Object.assign({}, a, { [key]: index }));
