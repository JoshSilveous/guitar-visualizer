import React from 'react'
import './ScaleInfo.scss'
import { genRomanNum } from './scale'

interface ScaleInfoProps {
    scaleInfo: ScaleInfo
}
/**
 * Displays information about the scale, specifically notes and chords.
 */
export function ScaleInfo({ scaleInfo }: ScaleInfoProps) {
    const scaleNotesDisplay = scaleInfo.scale.let.map((note) => {
        return (
            <div className="scale-note">
                <div>{note}</div>
            </div>
        )
    })

    const scaleChordsDisplay = scaleInfo.chords.map((chord, index) => {
        const chordNum = genRomanNum(index + 1, chord.type)
        const chordNotesDisplay = chord.let.map((note) => {
            /* sometimes, a note (usually the 7th) isn't actually in the 
               scale currently selected. If this is the case, we want to add 
               a "not-in-scale" class to the note */

            const className = scaleInfo.scale.let.includes(note) ? 'chord-note' : 'chord-note not-in-scale'

            return (
                <div className={className}>
                    <div>{note}</div>
                </div>
            )
        })
        return (
            <div className="chord-row">
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
            <div className="scale-chords-container">{scaleChordsDisplay}</div>
        </div>
    )
}
