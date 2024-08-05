<template>
    <div class="lg:container mx-auto py-10">
        <div class="lg:w-2/3 text-center mx-auto">
            <h1 class="text-gray-900 dark:text-white font-bold text-4xl md:text-5xl xl:text-6xl">{{ $t('home_title_1')
                }}
                <span class="text-primary dark:text-white"> {{ $t('home_title_2') }}</span>
            </h1>
            <p class="mt-8 text-gray-700 dark:text-gray-300 mb-20">{{ $t('home_description') }}</p>
        </div>

        <div class="flex gap-5 flex-wrap items-center justify-center flex-1">
            <div v-for="(item, i) in items" class="md:w-5/12 lg:max-w-sm" :key="i">
                <div
                    class="lg:max-w-sm p-6 max-h-100 bg-white border border-gray rounded-lg shadow-3 dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                            $t(item.title)
                        }}
                        </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ $t(item.description) }}</p>
                    <ul class="max-w-sm space-y-1 text-gray-500 list-inside dark:text-gray-400 mb-5">
                        <li v-for="(dt, i) in item.elements" class="flex items-center" :key="i"><svg
                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>{{ $t(dt) }}</li>
                    </ul>
                    <a :href="item.url"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {{ $t('Expore') }}
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>



    </div>
</template>
<script setup>
const items = [{
    title: "items_course.title",
    description: "items_course.description",
    elements: ["items_course.item_1", "items_course.item_2", "items_course.item_3"],
    url: "/courses"
},

{
    title: "iterms_interview.title",
    description: "iterms_interview.description",
    elements: ["iterms_interview.item_1", "iterms_interview.item_2", "iterms_interview.item_3"],
    url: "/interviews"
},

{
    title: "items_training_path.title",
    description: "items_training_path.description",
    elements: ["items_training_path.item_1", "items_training_path.item_2", "items_training_path.item_3"],
    url: "/learning"
},

{
    title: "items_cv.title",
    description: "items_cv.description",
    elements: ["items_cv.item_1", "items_cv.item_2", "items_cv.item_3"],
    url: "/cv_assistance"
}]
</script>