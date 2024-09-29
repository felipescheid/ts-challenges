/*
 * Includes
 *
 * Implement the JavaScript `Array.includes` function in the type system. A type takes two arguments and the output should be a `true` or `false` boolean.
 *
 * type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // false
*/

// this is not a trivial problem at all.
// we first need to be able to validate if the element is equal to one
// or more of the array elements. we can't do something like
// type NaivEqual<T,U> = T extends U ? (U extends T ? true : false) : false
// because there are edge cases:
// type NaiveEqual<string, string | number> // output: true
// OR
// type isString<T> = T extends string ? true : false;
// type isNumber<T> = T extenders number ? true : false;
// typeNaiveEqual<isString<"hi">, isNumber<42>>; //output: true
//
// since there is no way to perform a direct deep comparison between types, let's create a "fingerprint" of a type T.
// type FingerPrint<T> = <G>() => G extends T ? 1 : 2;

// this type represents the signature of a function! it is not 1 | 2
// we can then compare if two types are the same if the fingerprints are
// the same!

// type IsEqual<T, U> = FingerPrint<T> extends FingerPrint<U> ? true : false;

// we are ultimately checking if T and U are the same type by validating
// if their fingerprints match, and not by going over each property!

// now let's see if we can check if a given element is included in an array
type IsEqual<T,U> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? true : false;

type Includes<T extends readonly unknown[], U> =
  T extends [infer First, ...infer Tail]
    ? IsEqual<First, U> extends true ? true : Includes<Tail, U>
    : false;

import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
];
