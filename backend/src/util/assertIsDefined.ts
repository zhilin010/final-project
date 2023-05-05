// Identification
// Zhi Lin Li, 2131146
// Winter 2023 
// Programming Techniques 
// Professor Robert Vincent 
// Final Project 
// Due: 2023-05-05

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    // check if value of any type is defined. 
    if (!val) {
        throw Error("Expected 'val' to be defined, but received " + val + " instead.")
    }
}