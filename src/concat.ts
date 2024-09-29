/*
 ### Question

  Implement the JavaScript `Array.concat` function in the type system. A type takes the two arguments. The output should be a new array that includes inputs in ltr order

  For example:

  type Result = Concat<[1], [2]> // expected to be [1, 2]
 */
import { Equal, Expect } from '@type-challenges/utils';

type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

const tuple = [1] as const;

// tsc --noEmit concat.ts
type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
 Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
];
