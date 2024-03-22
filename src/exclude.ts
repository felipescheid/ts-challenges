// implement the built-in Exclude<T, U> without using it
// behavior: exclude from T the keys assigned to U

// Example:
// type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// type MyExclude<T, U extends keyof T> = any;

// we know that U extends the keys of T

// this is basically the inverse of Pick, where we passed in the keys we wanted to include in the new type
// the flow then was to iterate over the keys U and return T[U] for each of them
// Now we want to NOT return T[U]
// according to the TS handbook, we can filter out properties using `never` as a conditional type, so let's try it

// type MyExclude<T, U extends keyof T> = {
// 	[Property in keyof T as Property extends U ? never : Property]: T[Property];
// };
//
// This works for the scenario below
//
// type TestObj = { hello: string, goodbye: string, amount: number };
//
// type Result = MyExclude<TestObj, 'amount'>;
//
// const result: Result = { hello: 'world', goodbye: 'planet' };
//
// but it does not work for the example scenario, because 'a' does not extends keyof the 'a' | 'b' | 'c' union
//
// type Result2 = MyExclude<'a' | 'b' | 'c', 'a'>;
//
// const result2: Result2 = 'b';
//
// ahh...this problem really could have been phrased better. I was cracking my head trying to make this type work in two different was
// 1) remove specified keys from an obj
// 2) remove specified elements from union type
//
// Since the problem definition was so scant, I didn't understand that we needed to implement #2.
// I found this out by looking up the definition of the built-in Exclude type in the TS handbook:
// Exclude<UnionType, ExcludedMembers>
// Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers
//
// The type that removes keys from an object is actually called Omit.
// So let me try this again:

type MyExclude<UnionType, ExcludedMembers> = UnionType extends ExcludedMembers ? never : UnionType;

type Result2 = MyExclude<'a' | 'b' | 'c', 'a'>;
const result2: Result2 = 'b';

// now it works! but this solution is deceptively simple! why does it work to use the `extends` clause here?
// the answer is apparently hidden deep within the TS docs and is called distributive conditional types.
// this basically means that when checking T extends U ? X : Y where T is 'a' | 'b' |  'c', TS will run the following check
// ((A extends U ? X : Y) | (B extends U ? X : Y) | C extends U ? X : Y)
// more details here: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
