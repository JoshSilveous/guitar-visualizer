import React from 'react'

interface ScaleSelectorProps {
    scaleInfo: ScaleInfo
    setScaleSettings: React.Dispatch<React.SetStateAction<ScaleSettings>>
}

export function ScaleSelector({ scaleInfo, setScaleSettings }: ScaleSelectorProps) {
    console.log(scaleInfo)
    console.log(setScaleSettings)

    const chordMap = scaleInfo.chords.map((chord) => {
        const chordNotes = chord.let.map((letter) => {
            return <>{letter} </>
        })
        return (
            <>
                <span>
                    {chord.tonic.let} {chord.type} {chordNotes}
                </span>
                <br />
            </>
        )
    })

    return (
        <div className="scale-selector">
            <div>
                {scaleInfo.tonic.let} {scaleInfo.mode.name}
            </div>
            {chordMap}
        </div>
    )
}
