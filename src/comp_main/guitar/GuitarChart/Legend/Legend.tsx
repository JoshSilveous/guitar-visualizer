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
        <div className="legend">
            <h2>Legend</h2>
            {tonicNote}
            <br />
            {significantNote}
        </div>
    )
}
