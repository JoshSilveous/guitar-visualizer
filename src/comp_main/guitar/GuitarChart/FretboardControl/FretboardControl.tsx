import { StringLengthControl } from './StringLengthControl/StringLengthControl'
import { TuningControl } from './TuningControl/TuningControl'

interface FretboardControlProps {
    guitarSettings: GuitarSettings
    setGuitarSettings: React.Dispatch<React.SetStateAction<GuitarSettings>>
    scaleInfo: ScaleInfo
}
export function FretboardControl({ guitarSettings, setGuitarSettings, scaleInfo }: FretboardControlProps) {
    return (
        <div className="fretboardcontrol-container">
            <h2>Fretboard Settings</h2>
            <div className="col-split">
                <TuningControl
                    guitarSettings={guitarSettings}
                    setGuitarSettings={setGuitarSettings}
                    scaleInfo={scaleInfo}
                />
                <StringLengthControl guitarSettings={guitarSettings} setGuitarSettings={setGuitarSettings} />
            </div>
        </div>
    )
}
