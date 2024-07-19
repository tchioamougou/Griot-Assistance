<script setup>
import DashboardLayout from '../../components/DashboardLayout.vue';
import LearningForm from './LearningForm.vue';
import { items } from './LearningItems';
const itemsLearning = items;
</script>

<template>
    <div>
        <DashboardLayout>
            <template v-slot:default>
                <div class="flex flex-wrap justify-center gap-5">
                    <template v-for="(it, i) in itemsLearning">
                        <div class="w-3/12">
                            <LearningForm :item="it" />
                        </div>
                    </template>
                </div>
            </template>

        </DashboardLayout>
    </div>
</template>

<style></style>