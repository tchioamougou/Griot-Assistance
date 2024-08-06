<script setup>
import { defineAsyncComponent, ref } from 'vue';
const SignUp = defineAsyncComponent(() => import('./SignUp.vue'))
const isPrice = ref(true);
const getStart = () => {
    isPrice.value = false
}

const priceList = [{
    title: 'Basic',
    description: "Best option for personal use & for your next project.",
    price: "$1",
    elements: ['Individual configuration', 'No setup, or hidden fees', '24/7 Support']
}, {
    title: 'Standard',
    description: "Best option for personal use & for your next project.",
    price: "$3",
    elements: ['Individual configuration', 'No setup, or hidden fees', '24/7 Support']
}, {
    title: 'Premiun',
    description: "Best option for personal use & for your next project.",
    price: "$5",
    elements: ['Individual configuration', 'No setup, or hidden fees', '24/7 Support']
}]
</script>

<template>
    <DashboardLayout>
        <template v-slot:default>
            <section class="bg-white dark:bg-gray-900 dark:bg-black" v-if="isPrice">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            {{ $t('home_title_1') }}</h2>
                        <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400 dark:text-white">{{
                            $t('price_description') }}</p>
                    </div>
                    <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                        <!-- Pricing Card -->
                        <div v-for="(item, i) in priceList" :key="i"
                            class=" dark:bg-boxdark flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 class="mb-4 text-2xl font-semibold">{{ $t(item.title) }}</h3>
                            <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">{{ $t(item.description) }}
                            </p>
                            <div class="flex justify-center items-baseline my-8">
                                <span class="mr-2 text-5xl font-extrabold">{{ $t(item.price) }}</span>
                                <span class="text-gray-500 dark:text-gray-400">/{{ $t('month') }}</span>
                            </div>
                            <!-- List -->
                            <ul role="list" class="mb-8 space-y-4 text-left">
                                <li class="flex items-center space-x-3" v-for="(it, j) in item.elements" :key="j">
                                    <!-- Icon -->
                                    <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>{{ $t(it) }}</span>
                                </li>
                            </ul>
                            <a href="#" @click="getStart('start')"
                                class="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">
                                {{ $t('Get started') }}
                            </a>
                        </div>

                    </div>
                </div>
            </section>
            <sign-up v-else>

            </sign-up>
        </template>
    </DashboardLayout>
</template>

<style></style>