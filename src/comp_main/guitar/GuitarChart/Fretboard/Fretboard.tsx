import { getLet } from '../../../scale/scale'
import { generateString } from '../../guitar'

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

    const strings = guitarSettings.stringOpens.map((openNote) => {
        return generateString(openNote, guitarSettings.stringLength + 1)
    })

    const stringDisplay = strings.reverse().map((string) => {
        const noteDisplay = string.map((note) => {
            const isHighlighted = highlightState.notes[scaleInfo.scale.num.indexOf(note)]
            const isInScale = scaleInfo.scale.num.includes(note)

            let className = 'note'
            if (isHighlighted) {
                className += ' highlighted'
            }
            if (!isInScale) {
                className += ' not-in-scale'
            }

            function toggleHighlight() {
                if (isHighlighted) {
                    highlightCtrl.unhighlightNote(scaleInfo.scale.num.indexOf(note))
                } else {
                    highlightCtrl.highlightNote(scaleInfo.scale.num.indexOf(note))
                }
            }

            return (
                <div className="note-container">
                    <div className={className} onClick={toggleHighlight}>
                        <div className="note-text">{getLet(note, scaleInfo.isSharp)}</div>
                    </div>
                </div>
            )
        })
        return (
            <>
                <div className="string">{noteDisplay}</div>
                <div className="string-display"></div>
            </>
        )
    })

    return (
        <div className="fretboard-container">
            <div className="fretboard">{stringDisplay}</div>
        </div>
    )
}
