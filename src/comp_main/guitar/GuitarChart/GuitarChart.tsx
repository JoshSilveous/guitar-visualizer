import { useState } from 'react'
import { Fretboard } from './Fretboard/Fretboard'
import { FretboardControl } from './FretboardControl/FretboardControl'
import './GuitarChart.scss'

interface GuitarChartProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
    highlightCtrl: {
        highlightNote: (noteIndex: number) => void
        unhighlightNote: (noteIndex: number) => void
        highlightChord: (chordIndex: number) => void
        unhighlightChord: (chordIndex: number) => void
    }
}
export function GuitarChart({ scaleInfo, highlightState, highlightCtrl }: GuitarChartProps) {
    const [guitarSettings, setGuitarSettings] = useState<GuitarSettings>({
        stringOpens: [8, 1, 6, 11, 3, 8],
        stringLength: 12,
    })

    return (
        <div className="section guitarchart-container">
            <Fretboard
                scaleInfo={scaleInfo}
                highlightState={highlightState}
                highlightCtrl={highlightCtrl}
                guitarSettings={guitarSettings}
            />
            <FretboardControl
                guitarSettings={guitarSettings}
                setGuitarSettings={setGuitarSettings}
                scaleInfo={scaleInfo}
            />
        </div>
    )
}
