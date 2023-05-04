import * as scale from '../scale/scale'

/**
     * Creates all notes on a string, length determined by `getStringLength` .
     * @param note Numerical representation of the string's open note `0 - 11`.
     * @param stringLength Amount of notes on the string to generate.
     * @returns Array of each `note` on the string, numerical.
     */
export function generateString(note: number, stringLength: number) {
    let stringNotes = [note]
    for (let i = 0; i < stringLength - 1; i++) {
        note = note + 1
        stringNotes.push(scale.sanitizeNote(note))
    }
    return stringNotes
}

/**
     * Gets visibility (as `boolean`) of each note on a string, in a given scale.
     * @param string The string (array of `notes`) to analyze.
     * @param scale The scale (array of `notes`) to use.
     * @returns An array of equal length to `string`, populated with boolean values to demonstrate visibility.
     */
export function getNotesInScale(string: number[], scale: number[]) {
    return string.map(note => {
        if (scale.includes(note)) {
            return true
        } else {
            return false
        }
    })
}