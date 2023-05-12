import { useState } from 'react'
import './App.scss'
import './global.scss'
import { ScaleSelector } from './comp_main/scale/ScaleSelector'
import { genScaleInfo } from './comp_main/scale/genScaleInfo'
import { ScaleInfo } from './comp_main/scale/ScaleInfo'

function App() {
    const [scaleSettings, setScaleSettings] = useState<ScaleSettings>({
        tonic: 4,
        mode: 0,
        isSharp: true,
    })

    const scaleInfo = genScaleInfo(scaleSettings)

    const defaultHighlightState = {
        notes: scaleInfo.scale.num.map(() => false),
        chords: scaleInfo.chords.map(() => false),
    }

    const [highlightState, setHighlightState] = useState(defaultHighlightState)

    function highlightNote(noteIndex: number) {
        setHighlightState((prev) => {
            return {
                ...prev,
                notes: prev.notes.map((val, index) => {
                    if (index === noteIndex) {
                        return true
                    }
                    return val
                }),
            }
        })
    }
    function unhighlightNote(noteIndex: number) {
        setHighlightState((prev) => {
            // if a note in an active chord is unhighlighted, it unhighlights the chord
            let prevChords = prev.chords
            prev.chords.forEach((_chordStatus, chordIndex) => {
                const majChord = scaleInfo.chords[chordIndex].num
                majChord.pop()

                if (majChord.includes(scaleInfo.scale.num[noteIndex])) {
                    prevChords[chordIndex] = false
                }
            })

            return {
                chords: prev.chords,
                notes: prev.notes.map((val, index) => {
                    if (index === noteIndex) {
                        return false
                    }
                    return val
                }),
            }
        })
    }
    function highlightChord(chordIndex: number) {
        setHighlightState((prev) => {
            // unhighlights all other chords and notes
            const newNotes = prev.notes.map((_prev) => false)
            return {
                notes: newNotes,
                chords: prev.chords.map((_val, index) => {
                    if (index === chordIndex) {
                        return true
                    }
                    return false
                }),
            }
        })
    }
    function unhighlightChord(chordIndex: number) {
        setHighlightState((prev) => {
            return {
                ...prev,
                chords: prev.chords.map((val, index) => {
                    if (index === chordIndex) {
                        return false
                    }
                    return val
                }),
            }
        })
    }
    const highlightCtrl = {
        highlightNote,
        unhighlightNote,
        highlightChord,
        unhighlightChord,
    }

    return (
        <>
            <ScaleSelector scaleInfo={scaleInfo} setScaleSettings={setScaleSettings} />
            <ScaleInfo scaleInfo={scaleInfo} highlightState={highlightState} highlightCtrl={highlightCtrl} />
            <h1>Vite + React</h1>
        </>
    )
}

export default App
