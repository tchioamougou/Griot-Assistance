<script setup>
import { onBeforeMount, ref } from 'vue';
import Modal from '../../components/Modal.vue';
import { model } from '../../gemini';
import CourseItem from './CourseItem.vue';
import CourseDetail from './CourseDetail.vue';
import { createDocument, retrieveDataWithFilter } from '../../firebase/firestore';
import store from '../../store';
const addingNew = ref(false);
const isFetching = ref(false);
const courseTitle = ref('');
const course = ref('');
const finalStructure = ref([]);
const listeCourse = ref([]);
const selectCourse = ref({});
const isDetails = ref(false);
const fetching = async () => {
    const promps = `Create a structure course with the title:${courseTitle.value},
    return the content in the structure json format: 
    [{
    name:"module 1",
    description:"",
    objectives:""
    lessons:[{
    name:"Lecon 1",
    description:"",
    objectives:""
    }]
    }]
    `
    isFetching.value = true;
    addingNew.value = false;
    const result = await model.generateContentStream(promps);
    let text = ""
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
        course.value = text;
    }
    isFetching.value = false;
    course.value = course.value.replace('```json', '').replace('```', "");
    console.log(course.value)
    finalStructure.value = JSON.parse(course.value);
    const courseNew = {
        title: courseTitle.value,
        modules: finalStructure.value
    }
    listeCourse.value.push(courseNew);
    await createDocument('Users/' + store.state.firebaseUser.uid + '/Courses', courseNew)
    console.log(finalStructure);
}

onBeforeMount(async () => {
    const cs = await retrieveDataWithFilter(`Users/${store.state.firebaseUser.uid}/Courses`)
    listeCourse.value = cs ? cs : [];
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
    <template v-if="!isDetails">
        <div class="flex justify-end">
            <button @click="addingNew = true"
                class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
                New course
            </button>
        </div>
        <div class="mt-5 w-full">
            <template v-for="(cs, i) in listeCourse">
                <course-item :course="cs" @preview="onPreview(cs)"></course-item>
            </template>
        </div>
        <form @submit.prevent="fetching">
            <Modal v-if="addingNew" @cancel="addingNew = false" :label="'Generate'">
                <template v-slot:title>Generate a new course structure</template>
                <template v-slot:content>
                    <div class="mb-6">
                        <label for="large-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course
                            title</label>
                        <input type="text" id="large-input" v-model="courseTitle" required
                            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <label for="course title"></label>
                </template>
            </Modal>
        </form>
    </template>
    <template v-else>
        <CourseDetail :course="selectCourse" @go-back="onGoBack"></CourseDetail>
    </template>
</template>