interface LegendProps {
    scaleInfo: ScaleInfo
}
export function Legend({ scaleInfo }: LegendProps) {
    if (false) {
        console.log(scaleInfo)
    }

    const tonicNote = scaleInfo.tonic.let
    const significantNote = scaleInfo.mode.significantNotes
        ? scaleInfo.scale.let[scaleInfo.mode.significantNotes[0]]
        : null

    console.log(scaleInfo.mode.significantNotes)

    return (
        <div className="legend-container">
            <h2>Legend</h2>
            <div className="row">
                <div className="note tonic">{tonicNote}</div>
                <div className="label">Tonic note of scale</div>
            </div>
            {significantNote && (
                <div className="row">
                    <div className="note significant">{significantNote}</div>
                    <div className="label">
                        Significant note, emphasize while soloing to bring out the mode's unique sounds.
                    </div>
                </div>
            )}
        </div>
    )
}
