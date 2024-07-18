<script setup>
import { ref } from 'vue';
import DashboardLayout from '../../components/DashboardLayout.vue';
import Modal from '../../components/Modal.vue';
import { model } from '../../gemini';
import { convertirTexteEnHTML } from '../../utilities';
const addingNew = ref(false);
const isFetching = ref(false);
const courseTitle = ref('');
const courseDescription = ref('');
const course = ref('');
const finalStructure = ref([]);
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
    console.log(finalStructure);
}
</script>
<template>
    <DashboardLayout>
        <template v-slot:default>
            <button @click="addingNew = true"
                class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none">
                New course
            </button>
            <div class="mt-5">
                <h1 class="mb-10 font-bold">Course Title: {{ courseTitle }}</h1>
                <div v-if="isFetching">{{ course }}</div>
                <div v-for="(c, i) in finalStructure" :key="i">
                    <h1 class="mb-3 font-bold">{{ c.name }}</h1>
                    <h2 class="mb-3">Description</h2>
                    <p class="mb-3">{{ c.description }}</p>
                    <h2 class="mb-3">Objectives</h2>
                    <ul class="ps-5">
                        <li v-for="(o, j) in c.objectives" :key="j">
                            {{ o }}
                        </li>
                    </ul>
                    <h2 class="mb-5 mt-5">Lessons</h2>
                    <div v-for="(l, k) in c.lessons" :key="k" class="mb-5">
                        <h3 class="mb-5 font-semibold">{{ l.name }}</h3>
                        <h4 class="mb-5">Description</h4>
                        <p class="mb-5">{{ l.description }}</p>
                        <h4 class="mb-5">Objectifs</h4>
                        <ul class="ps-5">
                            <li v-for="(o, j) in l.objectifs" :key="j">
                                {{ o }}
                            </li>
                        </ul>
                    </div>
                </div>
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
    </DashboardLayout>
</template>