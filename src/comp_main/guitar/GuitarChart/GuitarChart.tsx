import { useState } from 'react'
import { Fretboard } from './Fretboard/Fretboard'
import { FretboardControl } from './FretboardControl/FretboardControl'
import './GuitarChart.scss'
import { Legend } from './Legend/Legend'

interface GuitarChartProps {
    scaleInfo: ScaleInfo
    highlightState: HighlightState
    highlightCtrl: HighlightCtrl
}
export function GuitarChart({ scaleInfo, highlightState, highlightCtrl }: GuitarChartProps) {
    const [guitarSettings, setGuitarSettings] = useState<GuitarSettings>({
        stringOpens: [8, 1, 6, 11, 3, 8],
        stringLength: 12,
    })

    return (
        <div className="section guitarchart-container">
            <Legend scaleInfo={scaleInfo} highlightState={highlightState} />
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
