interface ChordPatternsProps {
    scaleInfo: ScaleInfo
    highlightState: { notes: boolean[]; chords: boolean[] }
    toggleHighlightChord: (chordIndex: number) => void
    toggleHighlightNote: (noteIndex: number) => void
}

export function ChordPatterns({
    scaleInfo,
    highlightState,
    toggleHighlightChord,
    toggleHighlightNote,
}: ChordPatternsProps) {
    if (false) {
        console.log(scaleInfo, highlightState, toggleHighlightChord, toggleHighlightNote)
    }

    const chordProgColumns = scaleInfo.mode.chordProgressions.map((prog, progIndex) => {
        const progRow = prog.pattern.map((chordNum, chordNumIndex) => {
            let isSeventh = false
            if (chordNum > 9) {
                chordNum = chordNum / 10
                isSeventh = true
            }
            const chordType = scaleInfo.chords[chordNum - 1].type
            let chordTypeLabel = chordType.substring(0, 3) + '.'

            if (chordType === 'Major') {
                chordTypeLabel = chordTypeLabel.toUpperCase()
            } else {
                chordTypeLabel = chordTypeLabel.toLowerCase()
            }

            return (
                <div className="row-chord" key={chordNumIndex}>
                    <div className="numeral">{chordNum}</div>
                    <div className="chord-letter">
                        {scaleInfo.chords[chordNum - 1].tonic.let}
                        {isSeventh && <sup>7</sup>}
                    </div>
                    <div className="chord-type">{chordTypeLabel}</div>
                </div>
            )
        })

        return (
            <div className="prog-row">
                <div className="row-num" key={progIndex}>
                    {progIndex + 1}
                </div>
                {progRow}
            </div>
        )
    })

    return <div className="scale-chord-patterns">{chordProgColumns}</div>
}
