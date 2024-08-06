<template>

    <template v-if="isLoading">
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
    <template v-else>
        <div class="flex justify-between dark:bg-boxdark dark:text-white">
            <div class="py-10 px-10">
                <div v-html="res" class="dark:text-whit lessons" v-if="isLessons"></div>
                <template v-else>
                    <div class="container mx-auto px-4">
                        <h1 class="text-3xl font-bold text-center mb-4">{{ localCourse.title }}</h1>
                        <p class="text-lg text-gray-700 mb-4">{{ localCourse.Description ?? localCourse.description }}
                        </p>

                        <div class="flex flex-col md:flex-row gap-4">
                            <div class="bg-gray-100 p-4 rounded-lg">
                                <h3 class="text-xl font-bold mb-2">{{ $t('Level') }}</h3>
                                <p>{{ localCourse.level }}</p>
                            </div>
                            <div class="bg-gray-100 p-4 rounded-lg">
                                <h3 class="text-xl font-bold mb-2">{{ $t('Goal') }}</h3>
                                <p>{{ localCourse.time }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="flex justify-end" v-if="localCourse">
                <SideCourseLeft :course="localCourse" @lesson="onLesson" />
            </div>
        </div>
    </template>
</template>
<script setup>
// Converts local file information to a GoogleGenerativeAI.Part object.
import { model, modelJson } from '../../gemini';
import { convertirTexteEnHTML } from '../../utilities';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import SideCourseLeft from '../../components/SideCourseLeft.vue';
import { LEARN_ENTER_ENG, LEARN_ENTER_FR } from '../../utilities/constants';
import store from '../../store';
const props = defineProps({
    course: {
        type: Object,
    }
});
const listLearning = ref([]);
const isLoading = ref(false);
const localCourse = ref([]);
const res = ref('');
const isLessons = ref(false);
const onLesson = (lesson) => {
    getLessons(lesson)
}
// @ts-ignore
const readfile = (FileObject) => {
    return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = (event) => { resolve(event.target.result); }; reader.onerror = (error) => { reject(error); }; reader.readAsDataURL(FileObject); });
};


const fileToGenerativePart = async (path, mimeType) => {
    return {
        inlineData: {
            data: (await (readfile(path))).split(';base64,')[1],
            mimeType
        },
    };
}

const getLessons = async (lesson) => {
    isLessons.value = true;
    if (lesson.content) {
        res.value = lesson.content;
    } else {

        const prompt = `
    Im trying to learng this
    Teach me more about this and give me example
    This is The Curreent Lesson Title ${lesson.title} I'am following, 
    this is the description of the lessons : ${lesson.description},
    And this is the goal of the Lecons:${lesson.goals}. 

    give the response in thml code page inside a div
    `
        const result = await (model.generateContentStream(prompt));
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            text += chunkText;
            res.value = convertirTexteEnHTML(text);
        }

        lesson.content = res.value;
        isLessons.value = true;
        localStorage.setItem('leanings', JSON.stringify([localCourse.value]));
    }

}
const language = computed(() => {
    return store.state.language
})
const getCourse = async () => {
    isLoading.value = true;
    const prompt = language.value === 'fr' ? LEARN_ENTER_FR(props.course.title, props.course.description) : LEARN_ENTER_ENG(props.course.title, props.course.description);
    const result = await (modelJson.generateContentStream(prompt));
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
        res.value = convertirTexteEnHTML(text);
    }
    localCourse.value = JSON.parse(res.value);
    localStorage.setItem('leanings', JSON.stringify([localCourse.value]));
    isLoading.value = false;
}
onBeforeMount(() => {
    const cs = localStorage.getItem('leanings');
    if (props.course) {
    } else {
        getCourse();
    }
    listLearning.value = cs ? JSON.parse(cs) : [];
    localCourse.value = listLearning.value?.[0];
    console.log('cs', localCourse.value)
});
onMounted(() => {
    //getCourse();
})
</script>
<style>
.lessons h3 {
    margin: 0.5em 0em;
}

.lessons h1 {
    margin: 1em 0em;
    font-weight: bold;
}
</style>