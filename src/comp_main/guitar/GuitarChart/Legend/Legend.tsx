interface LegendProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
}
export function Legend({ scaleInfo, highlightState }: LegendProps) {
    const tonicNote = scaleInfo.tonic.let
    const significantNote = scaleInfo.mode.significantNotes
        ? scaleInfo.scale.let[scaleInfo.mode.significantNotes[0]]
        : null
    const isHighlightingChord = !highlightState.chords.every((val) => val === false)

    return (
        <div className="legend">
            <h2>Legend</h2>
            <div className="legend-container">
                <div className="row">
                    <div className={`note tonic`}>
                        <div className="note-text">{tonicNote}</div>
                    </div>
                    <div className="label">Tonic note of scale</div>
                </div>
                {significantNote && (
                    <div className="row">
                        <div className="note significant">
                            <div className="note-text">{significantNote}</div>
                        </div>
                        <div className="label">
                            Significant note, emphasize while soloing to bring out the mode's unique sounds.
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
