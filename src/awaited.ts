// If we have a type which is a wrapped type like Promise, how we can get the type which is inside the wrapped type?

// For example: if we have Promise<ExampleType> how to get ExampleType?

// type ExampleType = Promise<string>
// type Result = MyAwaited<ExampleType> // string

// I haven't even started thinking about the solution yet and I'm already frustrated with how the problem is phrased.
// Reading it, I have the impression that what it wants is the type inside ANY wrapped type. It says a wrapped type LIKE Promise,
// which makes me understand that Promise is only one wrapped type of many that should be treated by MyAwaited.
//
// But TS has an in-built Awaited type which is designed specifically FOR the Promise type. So at this moment I'm guessing that what this
// problem actually wants is for me to implement my own version of Awaited. Let's see.

type MyAwaited<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : T;

//tsc --noEmit {filename}.ts
const awaitedFortyTwo: MyAwaited<Promise<42>> = 42;
const awaitedNestedFortyTwo: MyAwaited<Promise<Promise<42>>> = 42;

let awaitedString: MyAwaited<Promise<string>>;

Promise.resolve("hello world").then(val => {
  awaitedString = val;
});

