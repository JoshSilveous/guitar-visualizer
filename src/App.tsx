import { useState } from 'react'
import './App.scss'
import './global.scss'
import { ScaleSelector } from './scale/ScaleSelector'
import { genScaleInfo } from './scale/genScaleInfo'
import { ScaleInfo } from './scale/ScaleInfo'

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
            <ScaleInfo scaleInfo={scaleInfo} />
            <h1>Vite + React</h1>
        </>
    )
}

export default App
