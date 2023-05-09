import { useState } from 'react'
import './App.css'
import { ScaleSelector } from './scale/ScaleSelector'
import { genScaleInfo } from './scale/genScaleInfo'

function App() {
    const [scaleSettings, setScaleSettings] = useState<ScaleSettings>({
        tonic: 4,
        mode: 0,
        isSharp: true,
    })

    const scaleInfo = genScaleInfo(scaleSettings)

    console.log(scaleInfo)

    return (
        <>
            <ScaleSelector scaleInfo={scaleInfo} setScaleSettings={setScaleSettings} />
            <h1>Vite + React</h1>
        </>
    )
}

export default App
