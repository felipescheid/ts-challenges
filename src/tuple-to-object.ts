// Given an array, transform it into an object type and the key/value must be in the provided array
//
// Example:
//
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// very important to use as const so TS will consider this a tuple!
const tuple = [1, 2, 3, 'hello'] as const;

// This was tough to solve and I was disappointed with the TS documentation
// I may have missed something, but here are my main frustrations:
// 1) The PropertyKey type is briefly mentioned but never detailed. I had to search the web to find out that PropertyKey = string | number | symbol
// 2) There is no clear documentation of the `in` operator below. I understand now that it can iterate over the elements of an array, but the docs really only cover [K in keyof T] examples, so it's basically trial and error to understand other use cases for it.
type TupleToObject<T extends readonly PropertyKey[]> = {
	[P in T[number]]: P;
};


type Result = TupleToObject<typeof tuple>;

const r: Result = { 1: 1, 2: 2, 3: 3, hello: "hello" };

console.log(r);


// question for future me: is it possible to create a generic type that receives an array of N strings or numbers and converts it into an object where each element maps to the same key/value? i.e. { a[0]: a[0], a[1]: a[1]}, etc

