<template>
    <div class="p-5">
        <div class="container mx-auto p-4">
            <h1 class="text-3xl font-bold   
            text-center mb-4">Welcome to CV Assistance!</h1>

            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-semibold mb-4">Upload Your CV</h2>
                <input type="file" id="cvFile" class="border border-gray-300 rounded-md p-2" @change="analyseCv">

                <div id="cvAnalysis"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
// Converts local file information to a GoogleGenerativeAI.Part object.
import { Buffer } from 'buffer';
import { model } from '../../gemini';
import { convertirTexteEnHTML } from '../../utilities';
import { ref } from 'vue';
const res = ref('');
// @ts-ignore
window.Buffer = Buffer;
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

const analyseCv = async (event) => {
    console.log(event.target.files);
    const files = event.target.files;
    let imageParts = [];
    for (const file of files) {
        imageParts.push(await fileToGenerativePart(file, file.type))
    }
    console.log('imageParts', imageParts);
    const prompt = "résoudre le problème dans cette image, vous devez expliquer chaque étape de la résolution afin que je puisse bien comprendre "
    const result = await (model.generateContentStream([prompt, ...imageParts]));
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
        res.value = convertirTexteEnHTML(text);
    }

}
</script>
<style scoped></style>