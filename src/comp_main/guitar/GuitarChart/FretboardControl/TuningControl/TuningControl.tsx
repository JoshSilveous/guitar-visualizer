import { useState } from 'react'
import { sanitizeNote, getLet } from '../../../../scale/scale'

interface TuningControlProps {
    guitarSettings: GuitarSettings
    setGuitarSettings: React.Dispatch<React.SetStateAction<GuitarSettings>>
    scaleInfo: ScaleInfo
}

export function TuningControl({ guitarSettings, setGuitarSettings, scaleInfo }: TuningControlProps) {
    const [usingCustomTuning, setUsingCustomTuning] = useState(false)

    const openStringList = !usingCustomTuning
        ? null
        : guitarSettings.stringOpens.map((note, index) => {
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

    function changeTuning(tuning: string) {
        switch (tuning) {
            case 'guitar-standard':
                setUsingCustomTuning(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringOpens: [8, 1, 6, 11, 3, 8],
                }))
                break
            case 'guitar-opend':
                setUsingCustomTuning(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringOpens: [6, 1, 6, 10, 1, 6],
                }))
                break
            case 'bass-standard':
                setUsingCustomTuning(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringOpens: [8, 1, 6, 11],
                }))
                break
            case 'ukelele-standard':
                setUsingCustomTuning(false)
                setGuitarSettings((prev) => ({
                    ...prev,
                    stringOpens: [11, 4, 8, 1],
                }))
                break
            case 'custom':
                setUsingCustomTuning(true)
        }
    }
    const tuningSelect = (
        <select className="tuning-select" onChange={(e) => changeTuning(e.target.value)} defaultValue="guitar-standard">
            <option value="custom">Custom</option>
            <option value="guitar-standard">Guitar - Standard</option>
            <option value="guitar-opend">Guitar - Open D</option>
            <option value="bass-standard">Bass Guitar - Standard</option>
            <option value="ukelele-standard">Ukelele - Standard</option>
        </select>
    )

    function addString() {
        setGuitarSettings((prev) => {
            let newStringOpens = prev.stringOpens
            newStringOpens.push(8)
            return { ...prev, stringOpens: newStringOpens }
        })
    }

    return (
        <div className="tuning-control">
            <h3>String Tuning</h3>
            {tuningSelect}
            {usingCustomTuning && (
                <div className="openstring-container">
                    {openStringList}
                    <div className="new-openstring" onClick={addString}>
                        <div className="icon">+</div>
                        <div className="text">Add String</div>
                    </div>
                </div>
            )}
        </div>
    )
}
