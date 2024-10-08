// Create a Length type that returns the length for a given tuple

// Example:
// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
// type teslaLength = Length<tesla>  // expected 4
// type spaceXLength = Length<spaceX> // expected 5

type Length<T extends readonly any[]> = T['length'];

type characters = [ 'clive', 'jill', 'cid', 'joshua' ];

type cLength = Length<characters>;

// tsc --noEmit {fileName}.ts
const _assertLength: 4 = (null as unknown) as cLength;
