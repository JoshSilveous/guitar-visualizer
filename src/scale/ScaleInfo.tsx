import React from 'react'

interface ScaleInfoProps {
    scaleInfo: ScaleInfo
}
/**
 * Displays information about the scale, specifically notes and chords.
 */
export function ScaleInfo({ scaleInfo }: ScaleInfoProps) {
    const scaleNotesDisplay = scaleInfo.scale.let.map((note) => {
        return <span className="scale-note">{note}</span>
    })

    const scaleChordsDisplay = scaleInfo.chords.map((chord) => {
        const chordNotesDisplay = chord.let.map((note) => {
            /* sometimes, a note (usually the 7th) isn't actually in the 
               scale currently selected. If this is the case, we want to add 
               a "not-in-scale" class to the note */

            const className = scaleInfo.scale.let.includes(note) ? 'chord-note' : 'chord-note not-in-scale'
            return <span className={className}>{note}</span>
        })
        return (
            <div className="chord-row">
                <span className="chord-name">
                    {chord.tonic.let} {chord.type}
                </span>
                {chordNotesDisplay}
            </div>
        )
    })

    return (
        <div className="section scaleinfo-container">
            <div className="scale-name">
                {scaleInfo.tonic.let} {scaleInfo.mode.name}
            </div>
            <div className="scale-notes-container">{scaleNotesDisplay}</div>
            <div className="scale-chords-container">{scaleChordsDisplay}</div>
        </div>
    )
}
