import { useState } from 'react'

interface StringLengthControlProps {
    guitarSettings: GuitarSettings
    setGuitarSettings: React.Dispatch<React.SetStateAction<GuitarSettings>>
}
export function StringLengthControl({ guitarSettings, setGuitarSettings }: StringLengthControlProps) {
    const [usingCustomLength, setUsingCustomLength] = useState(false)

    function changeLength(length: string) {
        switch (length) {
            case '12':
                setUsingCustomLength(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringLength: 12,
                }))
                break
            case '18':
                setUsingCustomLength(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringLength: 18,
                }))
                break
            case '20':
                setUsingCustomLength(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringLength: 20,
                }))
                break
            case '22':
                setUsingCustomLength(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringLength: 22,
                }))
                break
            case '24':
                setUsingCustomLength(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringLength: 24,
                }))
                break
            case 'custom':
                setUsingCustomLength(true)
                break
        }
    }

    const lengthSelect = (
        <select className="length-select" onChange={(e) => changeLength(e.target.value)} defaultValue="12">
            <option value="custom">Custom</option>
            <option value="12">12 frets</option>
            <option value="18">18 frets</option>
            <option value="20">20 frets</option>
            <option value="22">22 frets</option>
            <option value="24">24 frets</option>
        </select>
    )

    const cannotIncrementDown = guitarSettings.stringLength <= 8
    const cannotIncrementUp = guitarSettings.stringLength >= 1000

    function incrementUp() {
        if (!cannotIncrementUp) {
            setGuitarSettings((prev) => ({
                ...prev,
                stringLength: prev.stringLength + 1,
            }))
        }
    }
    function incrementDown() {
        if (!cannotIncrementDown) {
            setGuitarSettings((prev) => ({
                ...prev,
                stringLength: prev.stringLength - 1,
            }))
        }
    }

    return (
        <div className="string-length-control">
            <h3>String Length</h3>
            {lengthSelect}
            {usingCustomLength && (
                <div className="custom-length-container">
                    <div className="custom-length">
                        <div className={`back-arrow ${cannotIncrementDown ? ' disabled' : ''}`} onClick={incrementDown}>
                            ◀
                        </div>
                        <div className="current-length">{guitarSettings.stringLength}</div>
                        <div className={`forward-arrow ${cannotIncrementUp ? ' disabled' : ''}`} onClick={incrementUp}>
                            ▶
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
