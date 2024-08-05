<template>
    <div class="container mx-auto py-16">
        <h1 class="text-4xl font-bold text-center mb-8">Nos Services</h1>
        <div class="flex gap-5 flex-wrap">
            <div v-for="(item, i) in items">
                <div
                    class="max-w-sm  p-6 bg-white border border-gray rounded-lg shadow-3 dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.title
                            }}
                        </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ item.description }}</p>
                    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mb-5">
                        <li v-for="(dt, i) in item.elements" class="flex items-center"><svg
                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>{{ dt }}</li>
                    </ul>
                    <a href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
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
import { onMounted, ref } from 'vue';
const items = [{
    title: "Création de Structures de Cours",
    description: "Nous concevons des structures de cours personnalisées et efficaces pour répondre à vos besoins spécifiques.",
    elements: ["Analyse de vos objectifs", "Conception de modules de formation", "Création de supports pédagogiques"],
    url: "/courses"
},

{
    title: "Préparation aux Entretiens",
    description: "Nous vous accompagnons dans la préparation de vos entretiens d'embauche pour vous aider à vous démarquer.",
    elements: ["Simulation d'entretiens", "Conseils sur la communication non verbale", "Création de supports pédagogiques"],
    url: ""
}

]
</script>