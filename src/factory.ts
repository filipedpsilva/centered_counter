/**
 * Factory function that returns a function for generating a sequence of numbers
 *
 * @param {number} [start] - The starting number for the sequence. Default is 0.
 * @param {number} [step] - The step to increment each number in the sequence. Default is 1.
 * @returns {Function} - A function that generates the number sequence every time it is called.
 */
export const factory = (start?: number, step?: number): (() => number) => {
  let counter = 1;

  function increment(): void {
    counter++;
  }

  return (): number => {
    if (start === undefined) start = 0;
    if (step === undefined) step = 1;

    const count = start + step * counter;
    increment();
    return count;
  };
};
