// Implement the built-in Readonly<T> generic without using it
// Constructs a type with all the properties of T set to readonly, meaning the properties of the constructed type cannot be reconstructed

type Todo = {
	title: string;
	description: string;
};

type MyReadonly<T> = {
	readonly [key in keyof T]: T[key];
};

const todo2: MyReadonly<Todo> = {
	title: 'read only',
	description: 'these properties cannot be changed!'
};

// todo2.title = 'no can do - title is read only';
// todo2.description = 'oops! cannot change description either!';
