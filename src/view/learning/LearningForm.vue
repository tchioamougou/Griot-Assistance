<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="card bg-base-100 shadow-xl rounded-xl">
        <div class="card-body">
            <h2 class="card-title">{{ item.title }}</h2>
            <p class="mt-2 mb-2">{{ item.description }}</p>
            <div class="card-actions flex justify-end gap-5">
                <button class="h-10 bg-primary text-white">Beginner</button>
                <button class="h-10 bg-primary text-white">Intermediare</button>
                <button class="h-10 bg-primary text-white">Advance</button>
            </div>
        </div>
    </div>
</template>

<style></style>