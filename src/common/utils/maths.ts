export const random = (min: number, max?: number): number => {
  if (!max) {
    max = min;
    min = 0;
  }
  if (min > max) min = max;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
