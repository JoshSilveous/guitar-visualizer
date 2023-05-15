import './ScaleInfo.scss'
import { ChordTable } from './ChordTable/ChordTable'

interface ScaleInfoProps {
    scaleInfo: ScaleInfo
    highlightState: { notes: boolean[]; chords: boolean[] }
    highlightCtrl: {
        highlightNote: (noteIndex: number) => void
        unhighlightNote: (noteIndex: number) => void
        highlightChord: (chordIndex: number) => void
        unhighlightChord: (chordIndex: number) => void
    }
}
/**
 * Displays information about the scale, specifically notes and chords.
 */
export function ScaleInfo({ scaleInfo, highlightState, highlightCtrl }: ScaleInfoProps) {
    function toggleHighlightNote(noteIndex: number) {
        if (highlightState.notes[noteIndex]) {
            highlightCtrl.unhighlightNote(noteIndex)
        } else {
            highlightCtrl.highlightNote(noteIndex)
        }
    }
    function toggleHighlightChord(chordIndex: number) {
        if (highlightState.chords[chordIndex]) {
            highlightCtrl.unhighlightChord(chordIndex)
            scaleInfo.chords[chordIndex].num.forEach((note, index) => {
                if (index !== 3) {
                    highlightCtrl.unhighlightNote(scaleInfo.scale.num.indexOf(note))
                }
            })
        } else {
            highlightCtrl.highlightChord(chordIndex)
            scaleInfo.chords[chordIndex].num.forEach((note, index) => {
                if (index !== 3) {
                    highlightCtrl.highlightNote(scaleInfo.scale.num.indexOf(note))
                }
            })
        }
    }

    const scaleNotesDisplay = scaleInfo.scale.let.map((note, index) => {
        let className = 'scale-note'
        if (highlightState.notes[index]) {
            className += ' highlighted'
        }
        return (
            <div className={className} onClick={() => toggleHighlightNote(index)}>
                <div>{note}</div>
            </div>
        )
    })

    return (
        <div className="section scaleinfo-container">
            <div className="scale-name">
                {scaleInfo.tonic.let} {scaleInfo.mode.name}
            </div>
            <div className="scale-notes-container">{scaleNotesDisplay}</div>
            <ChordTable
                scaleInfo={scaleInfo}
                highlightState={highlightState}
                toggleHighlightNote={toggleHighlightNote}
                toggleHighlightChord={toggleHighlightChord}
            />
        </div>
    )
}
