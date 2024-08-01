import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAudioStore = defineStore('audioPlay', () => {
    const audioPlay = useStorage('audioPlay', ref(false))

    function toggleAudioPlay() {
        audioPlay.value = !audioPlay.value
    }

    return { audioPlay, toggleAudioPlay }
})
