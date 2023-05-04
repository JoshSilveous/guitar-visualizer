import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ScaleSelector } from './scale/ScaleSelector'

function App() {
    const [scaleSettings, setScaleSettings] = useState<ScaleSettings>({
        tonic: 4,
        mode: 0,
        isSharp: true,
    })

    return (
        <>
            <ScaleSelector />
            <h1>Vite + React</h1>
        </>
    )
}

export default App
