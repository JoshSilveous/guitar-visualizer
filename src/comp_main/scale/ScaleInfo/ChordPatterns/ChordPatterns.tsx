import React from 'react'
import { genRomanNum } from '../../scale'

interface ChordPatternsProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
    toggleHighlightChord: (chordIndex: number, includeSeventh: boolean) => void
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
            let chordTypeLabel: string = chordType

            const chordNumeral = genRomanNum(chordNum, chordType)

            let className = 'row-chord'
            const chordIndex = chordNum - 1
            if (highlightState.chords[chordIndex]) {
                className += ' highlighted'
            }

            return (
                <React.Fragment key={chordNumIndex}>
                    {chordNumIndex !== 0 && <div className="divider"></div>}
                    <div
                        className={className}
                        key={chordNumIndex}
                        onClick={() => toggleHighlightChord(chordNum - 1, isSeventh)}
                    >
                        <div className="chord-numeral">
                            {chordNumeral}
                            {isSeventh && <sup>7</sup>}
                        </div>
                        <div className="chord-letter">
                            {scaleInfo.chords[chordNum - 1].tonic.let}
                            {isSeventh && <sup>7</sup>}
                        </div>
                        <div className="chord-type">{chordTypeLabel}</div>
                    </div>
                </React.Fragment>
            )
        })

        return (
            <div className="prog-row" key={progIndex}>
                {progRow}
            </div>
        )
    })

    return (
        <div className="scale-chord-patterns">
            <div className="title">Suggested Chord Progressions</div>
            <div className="progression_container">
                {scaleInfo.mode.chordProgressions.length === 0 ? (
                    <span className="unavailable">No suggestions available for mode "{scaleInfo.mode.name}"</span>
                ) : (
                    chordProgColumns
                )}
            </div>
        </div>
    )
}
