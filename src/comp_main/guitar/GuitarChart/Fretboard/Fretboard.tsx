interface FretboardProps {
    scaleInfo: ScaleInfo
    highlightState: { notes: boolean[]; chords: boolean[] }
    highlightCtrl: {
        highlightNote: (noteIndex: number) => void
        unhighlightNote: (noteIndex: number) => void
        highlightChord: (chordIndex: number) => void
        unhighlightChord: (chordIndex: number) => void
    }
    guitarSettings: GuitarSettings
}
export function Fretboard({ scaleInfo, highlightState, highlightCtrl, guitarSettings }: FretboardProps) {
    if (false) {
        console.log(scaleInfo, highlightCtrl, highlightState, guitarSettings)
    }

    console.log(guitarSettings.stringOpens)

    let test = guitarSettings.stringOpens.map((ex) => {
        return <div style={{ width: '30px' }}>{ex}</div>
    })

    return (
        <div className="fretboard-container">
            {guitarSettings.stringLength} <br />
            {test}
        </div>
    )
}
