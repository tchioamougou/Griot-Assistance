<script setup>
import { ref } from 'vue';
import DashboardLayout from '../../components/DashboardLayout.vue';
import LearningForm from './LearningForm.vue';
import { items } from './LearningItems';
import LearningPlay from './LearningPlay.vue';
const itemsLearning = items;
const selectedCourse = ref({});
const isLearning = ref(false);
const learn = (course) => {
    console.log('course', course)
    selectedCourse.value = course;
    isLearning.value = true;
}
</script>

<template>
    <div>
        <div class="flex flex-wrap justify-center gap-5" v-if="!isLearning">
            <template v-for="(it, i) in itemsLearning">
                <div class="w-3/12">
                    <LearningForm :item="it" @detail="learn" />
                </div>
            </template>
        </div>
        <LearningPlay :course="selectedCourse" v-else></LearningPlay>
    </div>
</template>

<style></style>