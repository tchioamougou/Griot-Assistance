<script setup>
import { ref } from 'vue';
import InterviewPlay from './InterviewPlay.vue';
const learning = ref({
    jobTitle: "",
    description: ""
});
const isChating = ref(false);
const generateLearning = () => {
    isChating.value = true;
}
const endChat = () => {
    isChating.value = false;
}

</script>

<template>
    <div>
        <template v-if="!isChating">
            <div class=" text-center dark:bg-boxdark dark:py-5 dark:bg">
                <div>
                    <h1
                        class=" h-20 bg-gradient-to-r from-purple-700 via-indigo-600 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-4xl w-11/12 lg:w-6/12 ">
                        {{ $t('griot_hello_interview') }}</h1>
                </div>
                <div
                    class="bg-gradient-to-r dark:bg-white bg-graydark opacity-80 inline-block text-transparent bg-clip-text font-bold text-2xl w-11/12  md:w-8/12  mt-5">
                    {{ $t('griot_support_interview') }}
                </div>
            </div>
            <div class="flex flex-wrap justify-center gap-5 dark:bg-boxdark dark:py-5 mt-10">
                <form class="lg:w-9/12 w-11/12" @submit.prevent="generateLearning">
                    <div class="mb-6">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {{ $t('Job title') }}</label>
                        <input type="text" id="large-input" v-model="learning.jobTitle" required
                            class=" dark:bg-black block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="mb-6">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {{ $t('Describe more (optional)') }}</label>
                        <textarea type="text" id="large-input" v-model="learning.description"
                            class="dark:bg-black block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button class="bg-primary text-white">{{ $t('start_now') }}</button>
                </form>
            </div>
        </template>
        <template v-else>
            <InterviewPlay :title="learning.jobTitle" :description="learning.description" />
        </template>
    </div>
</template>

<style></style>