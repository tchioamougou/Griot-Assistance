<template>
    <div class="flex justify-between">
        <div>
            <div v-html="res"></div>
        </div>
        <div class="flex justify-end">
            <SideCourseLeft :course="localCourse" @lesson="onLesson" />
        </div>
    </div>

</template>
<script setup>
// Converts local file information to a GoogleGenerativeAI.Part object.
import { model } from '../../gemini';
import { convertirTexteEnHTML } from '../../utilities';
import { onBeforeMount, onMounted, ref } from 'vue';
import SideCourseLeft from '../../components/SideCourseLeft.vue';
const props = defineProps({
    course: {
        type: Object,
        required: true,
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

const getCourse = async () => {

    const prompt = `
    Hi Iam Styves, I want to learn ${props.course.tile}, 
    this is the description of the course : ${props.course.description},
    I want a course of a level:${props.course.level}.
    First propse to me propse to me all the Module a lessons with there description and goall that we have to learn. 
    First return the programme in the json Format Like this: 

    {
    "title": "course title",
    "Description":"course description",
    "level": 'level of the course',
    "time":'time to finisched the course',
    modules:[{
    title:"",
    decription:'',
    goal:"",
    lessons:[{
     title:"",
    decription:'',
    goal:"",
    }]
    }]
    }
    `
    const result = await (model.generateContentStream(prompt));
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
        res.value = convertirTexteEnHTML(text);
    }
    res.value = res.value.split('```')[1].replace('json', "");
    listLearning.value.push(JSON.parse(res.value));
    localStorage.setItem('leanings', JSON.stringify(listLearning.value));

}
onBeforeMount(() => {
    const cs = localStorage.getItem('leanings');
    listLearning.value = cs ? JSON.parse(cs) : [];
    localCourse.value = listLearning.value?.[1];
    console.log('cs', localCourse.value)
});
onMounted(() => {
    // getCourse();
})
</script>
<style scoped></style>