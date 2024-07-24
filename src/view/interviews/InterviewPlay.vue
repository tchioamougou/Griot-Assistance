<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { model } from '../../gemini';
import { convertText } from '../../utilities';
import RecordingBtn from '../../components/audio/RecordingBtn.vue';
import { textTopSpeech } from '../../utilities/speech';


const chat = ref(model.startChat({
}));
const search = ref('');
const isLoanding = ref(false);
const chatMessages = ref([]);
const canvas = ref('');
const generateLearning = async () => {
    isLoanding.value = true;
    try {
        const prompt = `
    je dois participe a cette un interview: ${props.title},
    description du jobs: ${props.description}
    peut tu me donner des questions et response pour m'entrener.
    tu poses un question je reponds, et tu poses la seconde question. 
    L'interview doit avoir 50 questions maximal et a chaque fois que tu pause unn qestio tu notes.
    A la fin tu me donne un resultat et des amenioration a faire.
    commence par faire une bref presentation de L'interviewer(Nom: Griot, company: Griot assistance ) et tu demande a l'utilisateur de te repondre par start. 
    s'il repond start tu commences a poser la premiere question
    `;
        const result = await chat.value.sendMessage(
            prompt
        );
        const response = result.response;
        canvas.value = convertText(response.text());
        chatMessages.value.push({ user: "boot", message: canvas.value });
        textTopSpeech(canvas.value)
    } catch (error) {
        console.log('Error', error.code);
    } finally {
        isLoanding.value = false;
    }
};
const sendResponse = async () => {
    isLoanding.value = true;
    try {
        chatMessages.value.push({ user: "you", message: search.value });
        const result = await chat.value.sendMessage(
            search.value
        );
        const response = result.response;
        canvas.value = convertText(response.text());
        chatMessages.value.push({ user: "boot", message: canvas.value });
        textTopSpeech(canvas.value)
        search.value = '';
    } catch (error) {
        console.log('Error', error.code);
    } finally {
        isLoanding.value = false;
    }
}
const generateText = async (file) => {
    isLoanding.value = true;
    try {
        const promps = 'voici ma response a la question';
        chatMessages.value.push({ user: "you", type: "audio", link: file.audioURL, message: canvas.value });
        const result = await chat.value.sendMessage(
            [promps, {
                inlineData: {
                    data: file.base64,
                    mimeType: file.mimeType
                }
            },]
        );
        const response = result.response;
        canvas.value = convertText(response.text());
        chatMessages.value.push({ user: "boot", message: canvas.value });
        search.value = '';
        textTopSpeech(canvas.value)
        isLoanding.value = false;
    } catch (error) {
        console.log('Error', error.code);
    } finally {
        isLoanding.value = false;
    }
}
const props = defineProps({
    title: String,
    description: String
});
onMounted(() => {
    generateLearning();
})
</script>

<template>
    <div class="right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] dark:bg-boxdark dark:border-boxdark">

        <!-- Heading -->
        <div class="flex flex-col space-y-1.5 pb-6">
            <h2 class="font-semibold text-lg tracking-tight dark:text-white">Interview: {{ title }}</h2>
            <p class="text-sm text-[#6b7280] leading-3">Powered by Griot</p>
        </div>
        <!-- Chat Container -->
        <div class="pr-4 h-[774px] overflow-auto" style="min-width: 100%; display: block;" id="messageBody">
            <template v-for="(ch, i) in chatMessages" :key="i">
                <!-- Chat Message AI -->
                <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1 dark:text-white" v-if="ch.user === 'boot'">
                    <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div class="rounded-full bg-gray-100 border p-1"><svg stroke="none" fill="black"
                                stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20"
                                xmlns="http://www.w3.org/2000/svg" class="dark:fill-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                </path>
                            </svg></div>
                    </span>
                    <p class="leading-relaxed"><span class="block font-bold text-gray-700">Griot AI </span> <span
                            v-html="ch.message"></span></p>
                </div>

                <!--  User Chat Message -->
                <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1 dark:text-white" v-else><span
                        class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div class="rounded-full bg-gray-100 border  p-1"><svg stroke="none" fill="black"
                                stroke-width="0" viewBox="0 0 16 16" height="20" width="20" class="dark:fill-white"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                                </path>
                            </svg></div>
                    </span>
                    <p class="leading-relaxed"><span class="block font-bold text-gray-700">You </span>
                        <template v-if="ch.type === 'audio'">
                            <audio controls>
                                <source :src="ch.link" type="audio/ogg">
                            </audio>
                        </template>
                        <template v-else>
                            <span v-html="ch.message"></span>
                        </template>
                    </p>
                </div>
            </template>
        </div>
        <!-- Input box  -->
        <div class="flex items-center pt-0 mt-2">
            <form @submit.prevent="sendResponse" class="flex items-center justify-center w-full space-x-2">
                <input :disabled="isLoanding"
                    class="dark:bg-black dark:text-white dark:border-boxdark flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                    placeholder="Type your message" v-model="search" />
                <RecordingBtn @finish="generateText"></RecordingBtn>
                <button :disabled="isLoanding"
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
                    <span v-if="!isLoanding">Send</span>
                    <div v-else class="w-5 h-5 rounded-full animate-spin 
                    border-2 b order-dashed border-blue-500 border-t-transparent"></div>

                </button>
            </form>
        </div>

    </div>
</template>

<style></style>