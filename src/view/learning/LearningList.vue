<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { items } from './LearningItems';
const LearningForm = defineAsyncComponent(() => import('./LearningForm.vue'));
const LearningPlay = defineAsyncComponent(() => import('./LearningPlay.vue'));
const itemsLearning = items;
const selectedCourse = ref({});
const isLearning = ref(false);
const learn = (course) => {
    console.log('course', course)
    selectedCourse.value = course;
    isLearning.value = true;
}
const learning = {
    what_learn: '',
    description: ''
}
const isLoading = ref(false);
const generateLearning = () => {
    isLoading.value = true;

    isLoading.value = false;
}
</script>

<template>
    <div>
        <div class="flex flex-wrap justify-center gap-5">
            <form class="w-9/12" @submit.prevent="generateLearning">
                <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        What do you want to learn to days</label>
                    <input type="text" id="large-input" v-model="learning.what_learn" required
                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Describe more (optional)</label>
                    <textarea type="text" id="large-input" v-model="learning.description"
                        class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button class="bg-primary text-white">Start now</button>
            </form>
        </div>
        <!--Quick Start Subject-->
        <div class="flex flex-wrap justify-center gap-5">
            <div class="mt-2 mb-2">
                <h1>Learn Quickly</h1>
            </div>
        </div>
        <div class="flex flex-wrap justify-center gap-5" v-if="!isLearning">
            <template v-for="(it, i) in itemsLearning" :key="i">
                <div class="w-3/12">
                    <LearningForm :item="it" @detail="learn" />
                </div>
            </template>
        </div>
        <LearningPlay :course="selectedCourse" v-else></LearningPlay>
    </div>
</template>

<style></style>