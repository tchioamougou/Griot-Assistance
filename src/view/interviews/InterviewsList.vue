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
            <div class="flex flex-wrap justify-center gap-5 dark:bg-boxdark dark:py-5">
                <form class="w-9/12" @submit.prevent="generateLearning">
                    <div class="mb-6">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Job title</label>
                        <input type="text" id="large-input" v-model="learning.jobTitle" required
                            class=" dark:bg-black block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="mb-6">
                        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Describe more (optional)</label>
                        <textarea type="text" id="large-input" v-model="learning.description" required
                            class="dark:bg-black block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button class="bg-primary text-white">Start now</button>
                </form>
            </div>
        </template>
        <template v-else>
            <InterviewPlay :title="learning.jobTitle" :description="learning.description" />
        </template>
    </div>
</template>

<style></style>