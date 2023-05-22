import { useState } from 'react'
import './App.scss'
import './global.scss'
import { ScaleSelector } from './comp_main/scale/ScaleSelector/ScaleSelector'
import { genScaleInfo } from './comp_main/scale/genScaleInfo'
import { ScaleInfo } from './comp_main/scale/ScaleInfo/ScaleInfo'
import { GuitarChart } from './comp_main/guitar/GuitarChart/GuitarChart'

function App() {
    const [scaleSettings, setScaleSettings] = useState<ScaleSettings>({
        tonic: 4,
        mode: 0,
        isSharp: true,
    })

    const scaleInfo = genScaleInfo(scaleSettings)

    const defaultHighlightState: HighlightState = {
        notes: scaleInfo.scale.num.map(() => false),
        chords: scaleInfo.chords.map(() => false),
        special: {
            tonic: scaleInfo.scale.num[0],
            significant: scaleInfo.mode.significantNotes,
        },
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
            let newSpecial = prev.special
            prev.chords.forEach((_chordStatus, chordIndex) => {
                const majChord = scaleInfo.chords[chordIndex].num
                majChord.pop()

                if (majChord.includes(scaleInfo.scale.num[noteIndex])) {
                    prevChords[chordIndex] = false
                    newSpecial.tonic = scaleInfo.tonic.num
                }
            })

            return {
                ...prev,
                special: newSpecial,
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
            let newSpecial = prev.special
            newSpecial.tonic = scaleInfo.chords[chordIndex].tonic.num
            console.log(newSpecial)
            return {
                special: newSpecial,
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
            let newSpecial = prev.special
            newSpecial.tonic = scaleInfo.tonic.num
            return {
                ...prev,
                special: newSpecial,
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
            <h1>Vite + React</h1>
            <ScaleSelector scaleInfo={scaleInfo} setScaleSettings={setScaleSettings} />
            <ScaleInfo scaleInfo={scaleInfo} highlightState={highlightState} highlightCtrl={highlightCtrl} />
            <GuitarChart scaleInfo={scaleInfo} highlightState={highlightState} highlightCtrl={highlightCtrl} />
        </>
    )
}

export default App
