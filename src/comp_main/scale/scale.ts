export const SCALE_LETTERS_SHARP = ['G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G']
export const SCALE_LETTERS_FLAT = ['A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G']
interface Scale_Mode {
    name: string
    formula: number[]
    chordPattern: ChordType[]
    chordProgessions: ChordProgression[]
}
export const SCALE_MODES: Scale_Mode[] = [
    {
        name: 'Major (Ionian)',
        formula: [2, 2, 1, 2, 2, 2, 1],
        chordPattern: ['Major', 'Minor', 'Minor', 'Major', 'Major', 'Minor', 'Diminished'],
        chordProgessions: [
            { pattern: [1, 5, 6, 4] },
            { pattern: [6, 4, 1, 5] },
            { pattern: [1, 4, 5, 4] },
            { pattern: [1, 6, 4, 5] },
            { pattern: [2, 5, 1, 6] },
        ],
    },
    {
        name: 'Dorian',
        formula: [2, 1, 2, 2, 2, 1, 2],
        chordPattern: ['Minor', 'Minor', 'Major', 'Major', 'Minor', 'Diminished', 'Major'],
        chordProgessions: [
            { pattern: [2, 5] },
            { pattern: [2, 4, 5] },
            { pattern: [2, 1, 5] },
            { pattern: [2, 3, 2, 5] },
            { pattern: [2, 3, 4, 3] },
        ],
    },
    {
        name: 'Phrygian',
        formula: [1, 2, 2, 2, 1, 2, 2],
        chordPattern: ['Minor', 'Major', 'Major', 'Minor', 'Diminished', 'Major', 'Minor'],
        chordProgessions: [{ pattern: [2, 3, 4, 1] }, { pattern: [1, 2, 3] }, { pattern: [2, 3, 1] }],
    },
    {
        name: 'Lydian',
        formula: [2, 2, 2, 1, 2, 2, 1],
        chordPattern: ['Major', 'Major', 'Minor', 'Diminished', 'Major', 'Minor', 'Minor'],
        chordProgessions: [
            { pattern: [1, 2, 5] },
            { pattern: [1, 2, 5, 1] },
            { pattern: [1, 3, 2, 5] },
            { pattern: [1, 6, 7, 2] },
            { pattern: [1, 2, 3, 2, 1] },
        ],
    },
    {
        name: 'Mixolydian',
        formula: [2, 2, 1, 2, 2, 1, 2],
        chordPattern: ['Major', 'Minor', 'Diminished', 'Major', 'Minor', 'Minor', 'Major'],
        chordProgessions: [{ pattern: [2, 5, 10] }, { pattern: [7, 4, 1] }, { pattern: [7, 2, 5, 4, 1] }],
    },
    {
        name: 'Minor (Aeolian)',
        formula: [2, 1, 2, 2, 1, 2, 2],
        chordPattern: ['Minor', 'Diminished', 'Major', 'Minor', 'Minor', 'Major', 'Major'],
        chordProgessions: [
            { pattern: [1, 4, 5, 1] },
            { pattern: [1, 2, 5, 1] },
            { pattern: [1, 6, 3, 7] },
            { pattern: [1, 7, 6, 7, 1] },
            { pattern: [1, 7, 6, 50] },
        ],
    },
    {
        name: 'Locrian',
        formula: [1, 2, 2, 1, 2, 2, 2],
        chordPattern: ['Diminished', 'Major', 'Minor', 'Minor', 'Major', 'Major', 'Minor'],
        chordProgessions: [],
    },
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

    return SCALE_MODES[mode].formula.map((incre) => {
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

/**
 * Generates a Chord from a tonic note, given type, including numeric and alphabetic notes.
 * @param tonic The tonic note
 * @param type `"Major" | "Minor" | "Diminished"`
 * @param isSharp Boolean, affects returned notes
 * @returns a `Chord` object.
 */
export function genChord(tonic: number, type: ChordType, isSharp: boolean): Chord {
    let chordNum: number[]
    let chordLet: string[]
    switch (type) {
        case 'Major':
            chordNum = [tonic, tonic + 4, tonic + 7, tonic + 11].map((note) => sanitizeNote(note))
            break
        case 'Minor':
            chordNum = [tonic, tonic + 3, tonic + 7, tonic + 10].map((note) => sanitizeNote(note))
            break
        case 'Diminished':
            chordNum = [tonic, tonic + 3, tonic + 6, tonic + 9].map((note) => sanitizeNote(note))
            break
        default:
            throw `getChord passed with invalid 'type' parameter: "${type}"`
    }

    chordLet = chordNum.map((note) => getLet(note, isSharp))

    return {
        tonic: {
            num: tonic,
            let: getLet(tonic, isSharp),
        },
        type: type,
        num: chordNum,
        let: chordLet,
    }
}

/**
 * Generated a Roman Numeral from a number, for musical notation.
 * Meant to annotate chords.
 * @param num The number, `1-7`.
 * @param type The type of chord being annotated.
 *
 * `"Major"` = Uppercase
 *
 * `"Minor"` = Lowercase
 *
 * `"Diminished"` = Lowercase + "°" suffix
 * @returns The formatted numeral.
 */
export function genRomanNum(num: number, type: ChordType) {
    let romanNum
    switch (num) {
        case 1:
            romanNum = 'I'
            break
        case 2:
            romanNum = 'II'
            break
        case 3:
            romanNum = 'III'
            break
        case 4:
            romanNum = 'IV'
            break
        case 5:
            romanNum = 'V'
            break
        case 6:
            romanNum = 'VI'
            break
        case 7:
            romanNum = 'VII'
            break
        default:
            return 'N/A'
    }
    if (type === 'Minor' || type === 'Diminished') {
        romanNum = romanNum.toLowerCase()
    }
    if (type === 'Diminished') {
        romanNum = romanNum + '°'
    }
    return romanNum
}
