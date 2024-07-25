<template>
    <RecordingBtn @finish="generateText" />
    {{ base64 }}
    <audio controls v-if="fileAudio">
        <source :src="fileAudio" type="audio/ogg">
    </audio>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import RecordingBtn from './../components/audio/RecordingBtn.vue';
import { textTopSpeech } from '../utilities/speech';
const base64 = ref();
const readfile = (FileObject) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onload = (event) => { resolve(event.target.result); }; reader.onerror = (error) => { reject(error); };
        console.log('type', typeof FileObject)

        reader.readAsDataURL(FileObject);
    });
};
const fileAudio = ref();
const generateText = async (file) => {
    base64.value = file;
    fileAudio.value = file.audioURL;
    console.log('audioURL', file.audioURL)
}
onMounted(() => {
    textTopSpeech("je suis un developpeur salesforce depuis 2015");
})
</script>