export global {
    interface ScaleSettings {
        tonic: number
        mode: number
        isSharp: boolean
    }
    type ChordType = 'Major' | 'Minor' | 'Diminished'
    interface Chord {
        tonic: {
            num: number
            let: string
        }
        type: ChordType
        num: number[]
        let: string[]
    }
    interface ChordProgression {
        /**
         * Range `1-7`. If the number is a multiple of `10`, this indicated a seventh note.
         *
         * Example: `50` = V7 / v7
         */
        pattern: number[]
    }
    interface ScaleInfo {
        tonic: {
            num: number
            let: string
        }
        mode: {
            num: number
            name: string
            chordProgressions: ChordProgression[]
            significantNotes?: number[]
        }
        isSharp: boolean
        scale: {
            num: number[]
            let: string[]
        }
        chords: Chord[]
    }
}
