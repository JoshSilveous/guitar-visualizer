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
    }
}
