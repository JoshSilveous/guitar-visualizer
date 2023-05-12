import React from 'react'
import { SCALE_LETTERS_FLAT, SCALE_LETTERS_SHARP, SCALE_MODES } from './scale'
import './ScaleSelector.scss'

interface ScaleSelectorProps {
    scaleInfo: ScaleInfo
    setScaleSettings: React.Dispatch<React.SetStateAction<ScaleSettings>>
}

/**
 * Component which has options for the user to change the current `ScaleSettings` properties
 */
export function ScaleSelector({ scaleInfo, setScaleSettings }: ScaleSelectorProps) {
    const tonicOptions = scaleInfo.isSharp ? SCALE_LETTERS_SHARP : SCALE_LETTERS_FLAT
    const tonicOptionsDropdown = tonicOptions.map((note, index) => {
        return (
            <option value={index} key={index}>
                {note}
            </option>
        )
    })

    const modeOptionsDropdown = SCALE_MODES.map((mode, index) => {
        return (
            <option value={index} key={index}>
                {mode.name}
            </option>
        )
    })

    function handleTonicChange(e: React.ChangeEvent) {
        const newTonic = parseInt((e.target as HTMLSelectElement).value)
        if (isNaN(newTonic)) {
            throw 'ERROR: attempt to set non-number as scale tonic!'
        }

        setScaleSettings((prev) => ({ ...prev, tonic: newTonic }))
    }

    function handleModeChange(e: React.ChangeEvent) {
        const newMode = parseInt((e.target as HTMLSelectElement).value)
        if (isNaN(newMode)) {
            throw 'ERROR: attempt to set non-number as scale mode!'
        }

        setScaleSettings((prev) => ({ ...prev, mode: newMode }))
    }

    function handleSharpChange(e: React.ChangeEvent) {
        const newIsSharp = (e.target as HTMLInputElement).checked

        setScaleSettings((prev) => ({ ...prev, isSharp: newIsSharp }))
    }

    return (
        <div className="section scale-selector">
            <div className="scale-container">
                <span className="label">Current Scale:</span>
                <select className="tonic-dropdown" defaultValue={scaleInfo.tonic.num} onChange={handleTonicChange}>
                    {tonicOptionsDropdown}
                </select>
                <select className="mode-dropdown" defaultValue={scaleInfo.mode.num} onChange={handleModeChange}>
                    {modeOptionsDropdown}
                </select>
            </div>
            <label htmlFor="scale-selector_sharp-checkbox">Use Sharps?</label>
            <input
                className="sharp-checkbox"
                type="checkbox"
                id="scale-selector_sharp-checkbox"
                checked={scaleInfo.isSharp}
                onChange={handleSharpChange}
            />
        </div>
    )
}
