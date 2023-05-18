import { getLet, sanitizeNote } from '../../../scale/scale'

interface FretboardControlProps {
    guitarSettings: GuitarSettings
    setGuitarSettings: React.Dispatch<React.SetStateAction<GuitarSettings>>
    scaleInfo: ScaleInfo
}
export function FretboardControl({ guitarSettings, setGuitarSettings, scaleInfo }: FretboardControlProps) {
    if (false) {
        console.log(guitarSettings, setGuitarSettings, scaleInfo)
    }

    const openStringList = guitarSettings.stringOpens.map((note, index) => {
        function incrementUp() {
            setGuitarSettings((prev) => {
                let newStringOpens = prev.stringOpens
                newStringOpens[index] = sanitizeNote(note + 1)
                return { ...prev, stringOpens: newStringOpens }
            })
        }
        function incrementDown() {
            setGuitarSettings((prev) => {
                let newStringOpens = prev.stringOpens
                newStringOpens[index] = sanitizeNote(note - 1)
                return { ...prev, stringOpens: newStringOpens }
            })
        }

        const onlyOneStringLeft = guitarSettings.stringOpens.length === 1
        function removeString() {
            if (!onlyOneStringLeft) {
                setGuitarSettings((prev) => {
                    let newStringOpens = prev.stringOpens
                    newStringOpens.splice(index, 1)
                    return { ...prev, stringOpens: newStringOpens }
                })
            }
        }

        return (
            <div className="openstring">
                <div className="string-num">{index + 1}</div>
                <div className="string-note-select">
                    <div className="back-arrow" onClick={incrementDown}>
                        ◀
                    </div>
                    <div className="current-note">{getLet(note, scaleInfo.isSharp)}</div>
                    <div className="forward-arrow" onClick={incrementUp}>
                        ▶
                    </div>
                </div>

                {!onlyOneStringLeft && (
                    <div className="string-delete" onClick={removeString}>
                        ✖
                    </div>
                )}
            </div>
        )
    })

    function addString() {
        setGuitarSettings((prev) => {
            let newStringOpens = prev.stringOpens
            newStringOpens.push(8)
            return { ...prev, stringOpens: newStringOpens }
        })
    }

    return (
        <div className="fretboardcontrol-container">
            <h2>Fretboard Settings</h2>
            <div className="openstring-container">
                <h3>Strings</h3>
                {openStringList}
                <div className="new-openstring" onClick={addString}>
                    <div className="icon">+</div>
                    <div className="text">Add String</div>
                </div>
            </div>
        </div>
    )
}
