<script setup>
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

const props = defineProps({
    course: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['lesson']);
const gotoLesson = (it) => {
    emits('lesson', it)
}
</script>

<template>
    <div
        class="relative overflow-auto flex  w-full max-w-[20rem] flex-col rounded-xl bg-white dark:bg-boxdark bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <div class="p-4 mb-2">
            <h5
                class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {{ course.title }}
            </h5>
        </div>
        <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
            <div class="relative block w-full" v-for="(it, i) in course.modules" :key="i">
                <div role="button"
                    class="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                    <button type="button"
                        class="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900 bg-white dark:bg-boxdark">
                        <p
                            class="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                            {{ it.title }}
                        </p>
                        <span class="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                                stroke="currentColor" aria-hidden="true"
                                class="w-4 h-4 mx-auto transition-transform rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5">
                                </path>
                            </svg>
                        </span>
                    </button>
                </div>
                <div class="overflow-hidden">
                    <div
                        class="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                        <nav
                            class="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                            <div v-for="(ls, j) in it.lessons" role="button" @click="gotoLesson(ls)" :key="j"
                                class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                <div class="grid mr-4 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="3" stroke="currentColor" aria-hidden="true" class="w-5 h-3">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                    </svg>
                                </div>
                                {{ ls.title }}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
