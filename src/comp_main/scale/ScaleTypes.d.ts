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
    interface ScaleInfo {
        tonic: {
            num: number
            let: string
        }
        mode: {
            num: number
            name: string
        }
        isSharp: boolean
        scale: {
            num: number[]
            let: string[]
        }
        chords: Chord[]
    }
}
