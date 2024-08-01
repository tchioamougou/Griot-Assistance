<template>
    <div class="flex justify-between dark:bg-boxdark dark:text-white">
        <div class="py-10 px-10">
            <div v-html="res" class="dark:text-white"></div>
        </div>
        <div class="flex justify-end" v-if="localCourse">
            <SideCourseLeft :course="localCourse" @lesson="onLesson" />
        </div>
    </div>

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
const localCourse = ref([]);
const res = ref('');
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
    res.value = res.value;
}
const language = computed(() => {
    return store.state.language
})
const getCourse = async () => {
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
}
onBeforeMount(() => {
    /*  const cs = localStorage.getItem('leanings');
      if (props.course) {
      } else {
          getCourse();
      }
      listLearning.value = cs ? JSON.parse(cs) : [];
      localCourse.value = listLearning.value?.[1];
      console.log('cs', localCourse.value)*/
});
onMounted(() => {
    getCourse();
})
</script>
<style scoped></style>