import { getLet } from '../../../scale/scale'
import { generateString } from '../../guitar'

interface FretboardProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
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

    console.log(highlightState.special)

    const strings = guitarSettings.stringOpens.map((openNote) => {
        return generateString(openNote, guitarSettings.stringLength + 1)
    })

    const stringDisplay = strings.reverse().map((string) => {
        const noteDisplay = string.map((note, noteIndex) => {
            const isHighlighted = highlightState.notes[scaleInfo.scale.num.indexOf(note)]
            const isInScale = scaleInfo.scale.num.includes(note)
            const isSignificant = highlightState.special.significant?.includes(scaleInfo.scale.num.indexOf(note))
            const noChordsAreHighlighted = highlightState.chords.every((val) => val === false)
            const letterNote = getLet(note, scaleInfo.isSharp)

            let className = 'note'
            let titleText = ''
            if (noteIndex === 0) {
                className += ' open-note'
                if (!isInScale) {
                    titleText = `The note ${letterNote} is not in the scale of ${scaleInfo.tonic.let} ${scaleInfo.mode.name}, and should be avoided.`
                }
            }
            if (note === highlightState.special.tonic) {
                className += ' focused-tonic'
            }
            if (isHighlighted) {
                className += ' highlighted'
            }
            if (isSignificant && noChordsAreHighlighted) {
                className += ' significant'
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
                    <div className={className} onClick={toggleHighlight} title={titleText}>
                        <div className="note-text">{letterNote}</div>
                    </div>

                    <div className="note-string-display"></div>
                </div>
            )
        })
        return (
            <>
                <div className="string">{noteDisplay}</div>
            </>
        )
    })

    return (
        <div className="fretboard-container">
            <div className="fretboard">{stringDisplay}</div>
        </div>
    )
}
