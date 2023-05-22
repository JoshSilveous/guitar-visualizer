export global {
    /**
     * Contains boolean arrays to indicate which notes / chords are highlighted
     */
    interface HighlightState {
        /**
         * Contains whether or not each note in the `scale` is highlighted,
         * using indexes to match.
         */
        notes: boolean[]
        /**
         * Contains whether or not each chord in the `scale` is highlighted,
         * using indexes to match.
         */
        chords: boolean[]

        special: {
            /**
             * Tonic is separated from `ScaleInfo` tonic, because when a chord is highlighted, that chord becomes the new tonic to be highlighted (without changing scale).
             */
            tonic: num
            /**
             * Other notes which may be useful during improvising, to enforce a mode's unique sounds.
             */
            significant?: num[]
        }
    }
}
