<template>
    <div class="lg:container lg:mx-auto lg:py-16 md:py-12 md:px-6 py-12 px-4 dark:text-white">
        <div class="flex justify-end gap-4 mb-2">
            <button class="bg-primary text-white" @click="exportAsPdf">{{ $t('Export pdf') }}</button>
            <button class="bg-primary text-white" @click="exportAsJson">{{ $t('Export as json') }}</button>
        </div>
        <h1 class="font-bold mb-10">{{ $t('Course title') }}: {{ course.title }}</h1>
        <div class="md:px-6 mb-5">
            <h4 class="mb-2 mt-2">Description:</h4>
            <p class="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                {{ course.description }}
            </p>
            <h4 class="mb-2 mt-2">Time:</h4>
            <p class="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                {{ course.time }}
            </p>
        </div>
        <div class="lg:w-12/12 w-full mx-auto mb-8 shadow-9 py-3 dark:bg-boxdark" v-for="(mod, i) in course.modules">
            <div class="w-full md:px-6 ">
                <div id="mainHeading" class="flex justify-between items-center w-full ">
                    <div class="">
                        <p
                            class="flex justify-center items-center dark:text-white font-medium text-base leading-6 md:leading-4 text-gray-800">
                            <span
                                class="lg:mr-6 mr-4 dark:text-white lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">
                                {{ $t('Module') }} {{ i + 1 }}: {{
                                    mod.name }}</span>
                        </p>
                    </div>
                    <button aria-label="toggler"
                        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-white dark:bg-boxdark"
                        data-menu>
                        <img class="transform dark:hidden "
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg" alt="toggler">
                        <img class="transform dark:block hidden "
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2dark.svg" alt="toggler">
                    </button>
                </div>
                <div id="menu" class="hidden mt-6 w-full">
                    <div class="md:px-6">
                        <h4 class="mb-2 mt-2">{{ $t('Description') }}:</h4>
                        <p class="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                            {{ mod.description }}
                        </p>
                        <h4 class="mb-2 mt-2">{{ $t('Objectives') }}:</h4>
                        <ul class="mb-2 mt-2">
                            <li v-for="(o, j) in mod.objectives">{{ o }}</li>
                        </ul>
                    </div>
                    <div class="lg:w-12/12 w-full mx-auto mb-3 shadow-1" v-for="(le, i) in mod.lessons">
                        <div class="w-full md:px-6">
                            <div id="mainHeading" class="flex justify-between items-center w-full">
                                <div class="">
                                    <p
                                        class="flex justify-center items-center dark:text-white font-medium text-base leading-6 md:leading-4 text-gray-800">
                                        <span
                                            class="lg:mr-6 mr-4 dark:text-white lg:text-xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">
                                            {{ $t('Lesson') }} {{ i + 1 }} {{
                                                le.name }}</span>
                                    </p>
                                </div>
                                <button aria-label="toggler"
                                    class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 dark:bg-boxdark bg-white"
                                    data-menu>
                                    <img class="transform dark:hidden "
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg"
                                        alt="toggler">
                                    <img class="transform dark:block hidden "
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2dark.svg"
                                        alt="toggler">
                                </button>
                            </div>
                            <div id="menu" class="hidden mt-6 w-full">
                                <div class="md:px-6">
                                    <h4 class="mb-2 mt-2">{{ $t('Description') }}:</h4>
                                    <p class="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                                        {{ le.description }}
                                    </p>
                                    <h4 class="mb-2 mt-2">{{ $t('Objectives') }}:</h4>
                                    <ul class="mb-2 mt-2">
                                        <li v-for="(o, j) in le.objectives">{{ o }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>

</template>
<script setup>
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "./../../utilities/vfs_fontes";
import { onMounted } from 'vue';
pdfMake.vfs = pdfFonts.default;

const props = defineProps({
    course: {
        type: Object,
        required: true
    }
});
const exportAsJson = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(props.course, null, 2)], {
        type: "text/plain"
    }));
    a.setAttribute("download", `${props.course.title}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
const exportAsPdf = async () => {
    const modules = props.course.modules.map((e, i) => {
        return [
            { text: `Module ${i + 1}: ${e.name}`, style: "module", margin: [0, 10] },
            { text: `${e.description}` },
            { text: `Objectifs`, style: "objectifs", margin: [0, 10] },
            {
                ul: e.objectives.map(ob => {
                    return { text: `${ob}`, margin: [0, 3] };
                })
            },
            e.lessons.map((le, i) => {
                return [
                    { text: `Lessons ${i + 1}: ${le.name}`, style: "module", margin: [0, 10] },
                    { text: `${le.description}` },
                    { text: `Objectifs`, style: "objectifs", margin: [0, 10] },
                    {
                        ul: le.objectives.map(ob => {
                            return { text: `${ob}`, margin: [0, 3] };
                        })
                    }

                ]
            })
        ]

    })
    const docDefinition = {
        header: 'This Document is generated by Griot',
        // background: 'Griot Assistance',
        footer: {
            columns: [
                { text: 'Griot', link: "afgriot.com", },
                { text: 'afrgriot.com', alignment: 'right' }
            ]
        },
        content:
            [
                { text: `Course Title ${props.course.title}`, style: 'header', margin: [0, 10] },
                { text: `${props.course.description}`, margin: [0, 5] },
                { text: `Time ${props.course.time}`, margin: [0, 5] }
            ].concat(modules),
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            module: {
                fontSize: 16,
                bold: true
            },
            objectifs: {
                fontSize: 14,
                bold: true
            },
            header_2: {
                fontSize: 10,
                bold: true
            }
        }
    };

    pdfMake.createPdf(docDefinition).open();
}
const emits = defineEmits(['go-back'])
const goBack = () => {
    emits('go-back');
}
onMounted(() => {
    let elements = document.querySelectorAll("[data-menu]");
    for (let i = 0; i < elements.length; i++) {
        let main = elements[i];

        main.addEventListener("click", function () {
            let element = main.parentElement.parentElement;
            let indicators = main.querySelectorAll("img");
            let child = element.querySelector("#menu");
            let h = element.querySelector("#mainHeading>div>p");

            h.classList.toggle("font-semibold");
            child.classList.toggle("hidden");
            // console.log(indicators[0]);
            indicators[0].classList.toggle("rotate-180");
        });
    }
})
</script>