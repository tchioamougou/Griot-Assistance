<script setup>
import { defineAsyncComponent, ref } from 'vue';
const LearningForm = defineAsyncComponent(() => import('./LearningForm.vue'));
const LearningPlay = defineAsyncComponent(() => import('./LearningPlay.vue'));
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
    selectedCourse.value = {
        title: learning.what_learn,
        description: learning.description,
    }
    isLearning.value = true;
}
</script>

<template>
    <div v-if="!isLearning">
        <div class=" text-center dark:bg-boxdark dark:py-5 dark:bg">
            <div class="">
                <h1
                    class=" h-20 bg-gradient-to-r from-purple-700 via-indigo-600 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-4xl w-11/12 lg:w-6/12">
                    {{ $t("griot_help_learning") }} </h1>
            </div>
            <div
                class="bg-gradient-to-r bg-graydark  dark:bg-white opacity-80 inline-block text-transparent bg-clip-text font-bold text-2xl w-11/12  md:w-8/12  mt-5">
                {{ $t('griot_support_learning') }}
            </div>
        </div>
        <div class="flex flex-wrap justify-center gap-5 dark:bg-boxdark dark:py-5 mt-10">
            <form class="w-9/12" @submit.prevent="generateLearning">
                <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {{ $t('enter_subject') }}</label>
                    <input type="text" id="large-input" v-model="learning.what_learn" required
                        class="dark:bg-black block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {{ $t("describe_more") }}</label>
                    <textarea type="text" id="large-input" v-model="learning.description"
                        class=" dark:bg-black block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <button class="bg-primary text-white">{{ $t('start_now') }}</button>
            </form>
        </div>
    </div>
    <LearningPlay :course="selectedCourse" v-if="isLearning"></LearningPlay>
</template>

<style></style>