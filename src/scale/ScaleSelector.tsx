import React from 'react'
import { SCALE_LETTERS_FLAT, SCALE_LETTERS_SHARP, SCALE_MODES } from './scale'

interface ScaleSelectorProps {
    scaleInfo: ScaleInfo
    setScaleSettings: React.Dispatch<React.SetStateAction<ScaleSettings>>
}

export function ScaleSelector({ scaleInfo, setScaleSettings }: ScaleSelectorProps) {
    console.log(scaleInfo)

    const tonicOptions = scaleInfo.isSharp ? SCALE_LETTERS_SHARP : SCALE_LETTERS_FLAT
    const tonicOptionsDropdown = tonicOptions.map((note, index) => {
        return (
            <option value={index} key={index}>
                {note}
            </option>
        )
    })

    function handleTonicChange(e: React.ChangeEvent) {
        const newTonic = parseInt((e.target as HTMLSelectElement).value)
        if (isNaN(newTonic)) {
            throw 'ERROR: attempt to set non-number as scale tonic!'
        }

        setScaleSettings((prev) => {
            return { ...prev, tonic: newTonic }
        })
    }

    const modeOptionsDropdown = SCALE_MODES.map((mode, index) => {
        return (
            <option value={index} key={index}>
                {mode.name}
            </option>
        )
    })

    function handleModeChange(e: React.ChangeEvent) {
        const newMode = parseInt((e.target as HTMLSelectElement).value)
        if (isNaN(newMode)) {
            throw 'ERROR: attempt to set non-number as scale mode!'
        }

        setScaleSettings((prev) => {
            return { ...prev, mode: newMode }
        })
    }

    return (
        <div className="scale-selector">
            <span className="label">Current Scale:</span>
            <select defaultValue={scaleInfo.tonic.num} onChange={handleTonicChange}>
                {tonicOptionsDropdown}
            </select>
            <select defaultValue={scaleInfo.mode.num} onChange={handleModeChange}>
                {modeOptionsDropdown}
            </select>
        </div>
    )
}
