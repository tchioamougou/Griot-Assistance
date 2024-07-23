<script setup>
import { onMounted, ref } from 'vue';

const recorder = ref('');
const isRecording = ref(false);
const chunks = ref([]);
const emits = defineEmits(['finish'])
const mediaManage = (event) => {
    event.preventDefault();
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        console.log('flux audio obtenu');
        recorder.value = new MediaRecorder(stream);
        recorder.value.ondataavailable = (e) => {
            chunks.value.push(e.data);
        }
        recorder.value.onstop = async (e) => {
            let audioBlob = new Blob(chunks.value, { type: 'audio/ogg' });
            console.log('audioBlob', audioBlob);
            const base64 = (await (readfile(audioBlob))).split(',')[1];
            const mimeType = audioBlob.type.split(';')[0]
            emits('finish', { audioBlob, base64: base64, mimeType: mimeType });
            isRecording.value = false;
        }
        recorder.value.start();
        console.log('recorder.value', recorder.value.state)
        isRecording.value = true;
    }).catch(function (error) {
        console.error("Erreur lors de l'accès au microphone:", error);
    });
}
const stropRecording = () => {
    recorder.value.stop();
}
const readfile = (FileObject) => {
    return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = (event) => { resolve(event.target.result); }; reader.onerror = (error) => { reject(error); }; reader.readAsDataURL(FileObject); });
};
</script>

<template>
    <div>
        <button id="startRecording" v-if="!isRecording" @click="mediaManage" type="button"
            class="bg-transparent border-none focus:decoration-transparent focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
        </button>
        <button id="stopRecording" v-else @click="stropRecording" type="button"
            class="bg-transparent border-none focus:decoration-transparent focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg></button>
    </div>
</template>

<style scoped></style>