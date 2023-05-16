import { genRomanNum } from '../../scale'

interface ChordTableProps {
    scaleInfo: ScaleInfo
    highlightState: { notes: boolean[]; chords: boolean[] }
    toggleHighlightChord: (chordIndex: number) => void
    toggleHighlightNote: (noteIndex: number) => void
}

/**
 * held outside of component to avoid re-declaration on state changes
 */
let userIsSelectingNote = false

export function ChordTable({ scaleInfo, highlightState, toggleHighlightChord, toggleHighlightNote }: ChordTableProps) {
    const scaleChordsDisplay = scaleInfo.chords.map((chord, index) => {
        const chordNum = genRomanNum(index + 1, chord.type)
        const chordNotesDisplay = chord.let.map((note, noteRelativeIndex) => {
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
                    key={noteRelativeIndex}
                >
                    <div>{note}</div>
                </div>
            )
        })
        let className = 'chord-row'
        if (highlightState.chords[index]) {
            className += ' highlighted'
        }

        function handleNoteClick(chordIndex: number) {
            if (!userIsSelectingNote) {
                toggleHighlightChord(chordIndex)
            }
        }

        return (
            <div className={className} onClick={() => handleNoteClick(index)} key={index}>
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
        <div className="scale-chords">
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
