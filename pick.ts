// Implement the generic Pick<T, K> without using it
// Constructs a type by picking the set of properties K from T

interface Todo {
	title: string;
	description: string;
	completed: boolean;
};

// first, getting acquainted with the keyof operator
// it basically returns a union of the object's keys
type F<T extends keyof Todo> = T;

type TitleOrDescription = F<'title' | 'description'>;
type TitleOrCompleted = F<'title' | 'completed'>;

const titleOrDescription1: TitleOrDescription = 'title';
const titleOrDescripition2: TitleOrDescription = 'description';

// const titleOrDescriptionError: TitleOrDescription = 'completed';

const titleOrCompleted: TitleOrCompleted = 'completed';

// NOTE: I was actually feeling stupid here - I found this solution after thinking for a bit,
// but I was trying to get it to work using an interface instead of a type, and it does not work
// that way. I need to figure out why - according to TSDocs, types and interfaces are basically interchangeable
type MyPick<T, K extends keyof T>  = {
	[key in K]: T[key];
};

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const preview: TodoPreview = {
	title: 'hello world!',
	completed: false,
};

// const previewError: TodoPreview = { ...preview, description: 'this should not be here!' };


