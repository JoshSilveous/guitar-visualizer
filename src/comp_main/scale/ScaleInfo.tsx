import './ScaleInfo.scss'
import { genRomanNum } from './scale'

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

let userIsSelectingNote = false

export function ScaleInfo({ scaleInfo, highlightState, highlightCtrl }: ScaleInfoProps) {
    function toggleHighlightNote(noteIndex: number) {
        if (highlightState.notes[noteIndex]) {
            highlightCtrl.unhighlightNote(noteIndex)
        } else {
            highlightCtrl.highlightNote(noteIndex)
        }
    }
    function toggleHighlightChord(chordIndex: number) {
        if (!userIsSelectingNote) {
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

    const scaleChordsDisplay = scaleInfo.chords.map((chord, index) => {
        const chordNum = genRomanNum(index + 1, chord.type)
        const chordNotesDisplay = chord.let.map((note) => {
            /* sometimes, a note (usually the 7th) isn't actually in the 
               scale currently selected. If this is the case, we want to add 
               a "out-of-scale" class to the note */

            let className = 'chord-note'
            let caption = ''
            if (!scaleInfo.scale.let.includes(note)) {
                className += ' out-of-scale'
                caption = `${note} is not in the scale of ${scaleInfo.tonic.let} ${scaleInfo.mode.name}, and should be avoided.`
            }

            const noteIndex = scaleInfo.scale.let.indexOf(note)
            if (highlightState.notes[noteIndex]) {
                className += ' highlighted'
            }

            return (
                <div
                    className={className}
                    onClick={() => toggleHighlightNote(noteIndex)}
                    title={caption}
                    onMouseEnter={() => {
                        userIsSelectingNote = true
                    }}
                    onMouseLeave={() => {
                        userIsSelectingNote = false
                    }}
                >
                    <div>{note}</div>
                </div>
            )
        })
        let className = 'chord-row'
        if (highlightState.chords[index]) {
            className += ' highlighted'
        }
        return (
            <div className={className} onClick={() => toggleHighlightChord(index)}>
                <span className="content">
                    <div className="chord-num">{chordNum}</div>
                    <div className="chord-name">
                        <div className="chord-tonic">{chord.tonic.let}</div>
                        <div className="chord-type">{chord.type}</div>
                    </div>
                    {chordNotesDisplay}
                </span>
            </div>
        )
    })

    return (
        <div className="section scaleinfo-container">
            <div className="scale-name">
                {scaleInfo.tonic.let} {scaleInfo.mode.name}
            </div>
            <div className="scale-notes-container">{scaleNotesDisplay}</div>
            <div className="scale-chords-label">
                <div className="chord-name-label">Chord Name</div>
                <div className="chord-note-label">
                    <span>1</span>st
                </div>
                <div className="chord-note-label">
                    <span>3</span>rd
                </div>
                <div className="chord-note-label">
                    <span>5</span>th
                </div>
                <div className="chord-note-label">
                    <span>7</span>th
                </div>
            </div>
            <div className="scale-chords-container">{scaleChordsDisplay}</div>
        </div>
    )
}
