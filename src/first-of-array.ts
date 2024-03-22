// implement a type First<T> that receives an Array T and returns the type of the first element in the array.

// Example:
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3, 2, 1]
// type head1 = First<arr1> // expected to be 'a'
// type head2 = First<arr2> // expected to be 3
//
// NOTE: these are actually tuples, no?
// It was actually pretty cool to implenment the infer solution here

type First<T extends any[]> = T extends [infer First, ...any] ? First : never;

// other alternatives
type FirstB<T extends any[]> = T extends [] ? never : T[0];

type FirstC<T extends any[]> = T['length'] extends 0 ? never : T[0];

type FirstD<T extends any[]> = T[number] extends never ? never : T[0];

type arr1 = [1,2,3];
type arr2 = ['hello', 'world'];
type arr3 = [];

type head1 = First<arr1>;
type head2 = First<arr2>;
type head3 = First<arr3>;

