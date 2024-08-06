<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { model, modelJson } from '../../gemini';
import CourseDetail from './CourseDetail.vue';
import store from '../../store';
import { COURSE_ENTER_EN, COURSE_ENTER_FR } from '../../utilities/constants';
const addingNew = ref(false);
const isFetching = ref(false);
const courseTitle = ref('');
const course = ref('');
const finalStructure = ref([]);
const listeCourse = ref([]);
const selectCourse = ref({});
const isDetails = ref(false);
const language = computed(() => {
    return store.state.language
})
const fetching = async () => {
    const prompt = language.value === 'fr' ? COURSE_ENTER_FR(courseTitle.value) : COURSE_ENTER_EN(courseTitle.value);

    isFetching.value = true;
    addingNew.value = false;
    const result = await modelJson.generateContentStream(prompt);
    let text = ""
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
        course.value = text;
    }
    isFetching.value = false;
    console.log(course.value);
    finalStructure.value = JSON.parse(course.value);
    listeCourse.value.push(finalStructure.value);
    selectCourse.value = finalStructure.value;
    localStorage.setItem('Courses', JSON.stringify(listeCourse.value));
}

onBeforeMount(async () => {
    const cs = localStorage.getItem('Courses');
    console.log(cs);
    listeCourse.value = cs ? JSON.parse(cs) : [];
    selectCourse.value = listeCourse.value?.[0];
});
const onPreview = (cs) => {
    selectCourse.value = cs;
    isDetails.value = true;
}
const onGoBack = () => {
    selectCourse.value = false;
    isDetails.value = false;
}


</script>
<template>
    <div class="mt-5 w-full">
        <!--  <template v-for="(cs, i) in listeCourse">
            <course-item :course="cs" @preview="onPreview(cs)"></course-item>
        </template>-->
    </div>
    <form @submit.prevent="fetching">
        <span class="dark:text-white"></span>
        <div class="mb-6 flex justify-center">
            <input type="text" id="large-input" v-model="courseTitle" required :placeholder="$t('Course title')"
                class=" dark:bg-black block lg:w-8/12 w-9/12 p-4 text-gray-900 border border-gray-300 rounded-e-none border-e-0 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <button @click="addingNew = true"
                class="p-4 font-medium tracking-wide text-white bg-indigo-600 rounded-s-none hover:bg-indigo-500 focus:outline-none">
                {{ $t('Generate new course structure') }}
            </button>
        </div>
    </form>

    <template v-if="isFetching">
        <div class="flex justify-center">
            <div aria-label="Loading..." role="status" class="flex items-center space-x-2 dark:text-white">
                <svg class="h-20 w-20 animate-spin stroke-gray" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24">
                    </line>
                </svg>
                <span class="text-4xl font-medium text-gray-500">Loading...</span>
            </div>
        </div>
    </template>
    <template v-if="!isFetching && selectCourse && selectCourse.title">
        <CourseDetail :course="selectCourse" @go-back="onGoBack"></CourseDetail>
    </template>
</template>