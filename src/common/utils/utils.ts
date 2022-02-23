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
