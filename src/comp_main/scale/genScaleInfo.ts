import * as scale from './scale'

export function genScaleInfo(scaleSettings: ScaleSettings): ScaleInfo {
    const scaleNum = scale.genScale(scaleSettings.tonic, scaleSettings.mode)
    const scaleLet = scaleNum.map((note) => scale.getLet(note, scaleSettings.isSharp))

    const mode = scale.SCALE_MODES[scaleSettings.mode]
    const chords = scaleNum.map((note, index) => {
        const chordType = mode.chordPattern[index]
        return scale.genChord(note, chordType, scaleSettings.isSharp)
    })

    return {
        tonic: {
            num: scaleSettings.tonic,
            let: scale.getLet(scaleSettings.tonic, scaleSettings.isSharp),
        },
        mode: {
            num: scaleSettings.mode,
            name: mode.name,
            chordProgressions: mode.chordProgessions,
            significantNotes: mode.significantNotes,
        },
        isSharp: scaleSettings.isSharp,
        scale: {
            num: scaleNum,
            let: scaleLet,
        },
        chords: chords,
    } as ScaleInfo
}
