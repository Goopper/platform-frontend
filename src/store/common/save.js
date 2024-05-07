import { defineStore } from 'pinia';

// store save state
export const useSaveStore = defineStore('save', {
    state: () => ({
        saved: true,
    }),
    actions: {
        setAsSaved() {
            this.saved = true;
        },
        setAsUnsaved() {
            this.saved = false;
        },
        setSaveState(state) {
            this.saved = state;
        }
    },
    getters: {
        isSaved(state) {
            return state.saved;
        },
    },
});
