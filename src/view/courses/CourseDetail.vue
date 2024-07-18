<template>
    <div class="lg:container lg:mx-auto lg:py-16 md:py-12 md:px-6 py-12 px-4">
        <h1 class="font-bold mb-10">Course title: {{ course.title }}</h1>
        <div class="lg:w-12/12 w-full mx-auto mb-8 shadow-9 py-3" v-for="(mod, i) in course.modules">
            <div class="w-full md:px-6">
                <div id="mainHeading" class="flex justify-between items-center w-full">
                    <div class="">
                        <p
                            class="flex justify-center items-center dark:text-white font-medium text-base leading-6 md:leading-4 text-gray-800">
                            <span
                                class="lg:mr-6 mr-4 dark:text-white lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">{{
                                    mod.name }}</span>
                        </p>
                    </div>
                    <button aria-label="toggler"
                        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" data-menu>
                        <img class="transform dark:hidden "
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg" alt="toggler">
                        <img class="transform dark:block hidden "
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2dark.svg" alt="toggler">
                    </button>
                </div>
                <div id="menu" class="hidden mt-6 w-full">
                    <div class="md:px-6">
                        <h4 class="mb-2 mt-2">Description:</h4>
                        <p class="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                            {{ mod.description }}
                        </p>
                        <h4 class="mb-2 mt-2">Objectives:</h4>
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
                                            class="lg:mr-6 mr-4 dark:text-white lg:text-xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">{{
                                                le.name }}</span>
                                    </p>
                                </div>
                                <button aria-label="toggler"
                                    class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
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
                                    <h4 class="mb-2 mt-2">Description:</h4>
                                    <p class="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                                        {{ le.description }}
                                    </p>
                                    <h4 class="mb-2 mt-2">Objectives:</h4>
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
import { onMounted } from 'vue';
const props = defineProps({
    course: {
        type: Object,
        required: true
    }
})
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