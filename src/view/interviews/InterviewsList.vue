<script setup>
import { ref } from 'vue';

const generateLearning = () => { };
const learning = ref({
    jobTitle: "",
    description: ""
})
</script>

<template>
    <div>
        <div class="flex flex-wrap justify-center gap-5">
            <form class="w-9/12" @submit.prevent="generateLearning">
                <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Job title</label>
                    <input type="text" id="large-input" v-model="learning.jobTitle" required
                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Describe more (optional)</label>
                    <textarea type="text" id="large-input" v-model="learning.description" required
                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button class="bg-primary text-white">Start now</button>
            </form>
        </div>
    </div>
</template>

<style></style>