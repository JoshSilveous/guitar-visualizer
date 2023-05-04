export const SCALE_LETTERS_SHARP = [
    'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'
]
export const SCALE_LETTERS_FLAT = [
    'A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G'
]
interface Scale_Mode {
    modeName: string,
    modeFormula: number[]
}
export const SCALE_MODES: Scale_Mode[] = [
    { modeName: "Ionian", modeFormula: [2, 2, 1, 2, 2, 2, 1] },
    { modeName: "Dorian", modeFormula: [2, 1, 2, 2, 2, 1, 2] },
    { modeName: "Phrygian", modeFormula: [1, 2, 2, 2, 1, 2, 2] },
    { modeName: "Lydian", modeFormula: [2, 2, 2, 1, 2, 2, 1] },
    { modeName: "Mixolydian", modeFormula: [2, 2, 1, 2, 2, 1, 2] },
    { modeName: "Aeolian", modeFormula: [2, 1, 2, 2, 1, 2, 2] },
    { modeName: "Locrian", modeFormula: [1, 2, 2, 1, 2, 2, 2] },
]


/**
 * Generates a scale.
 * @param note The tonic note (numeric) `0 - 11`.
 * @param mode The mode to use (numeric).
 * @returns An array of `notes` in numeric format.
 */
export function genScale(note: number, mode: number) {
    if (note > 11 || note < 0) {
        throw `input for getScale invalid. note ${note} doesn't exist`
    }
    if (mode < 0 || mode > SCALE_MODES.length - 1) {
        throw `input for getScale invalid. mode ${mode} doesn't exist`
    }

    return SCALE_MODES[mode].modeFormula.map(incre => {
        note = sanitizeNote(note + incre)
        return sanitizeNote(note - incre)
    })

}

/**
 * Gets the name of a note
 * @param note The note in numeric form.
 * @param isSharp Whether or not sharps are used (instead of flats).
 * @returns The `string` name of the note.
 */
export function getLet(note: number, isSharp: boolean) {
    if (note > 11 || note < 0) {
        throw `input for getLet invalid. note ${note} doesn't exist`
    }
    if (isSharp) {
        return SCALE_LETTERS_SHARP[note]
    } else {
        return SCALE_LETTERS_FLAT[note]
    }
}

/**
 * Converts notes outside `0 - 11` to their correct numbers.
 * @param note The note (numeric), can be outside of range `0 - 11`.
 * @returns The sanitized `note`.
 */
export function sanitizeNote(note: number): number {
    if (note > 11) {
        return sanitizeNote(note - 12)
    }
    if (note < 0) {
        return sanitizeNote(note + 12)
    }
    return note
}
