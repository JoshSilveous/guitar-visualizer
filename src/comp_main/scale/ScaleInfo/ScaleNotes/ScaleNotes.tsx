interface ScaleNotesProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
    toggleHighlightNote: (noteIndex: number) => void
}

export function ScaleNotes({ scaleInfo, highlightState, toggleHighlightNote }: ScaleNotesProps) {
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
    return <div className="scale-notes-container">{scaleNotesDisplay}</div>
}
