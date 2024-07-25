<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const emits = defineEmits(['detail']);
const show = (level) => {
    emits('detail', { ...props.item, level });
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl rounded-xl dark:bg-boxdark">
        <div class="card-body">
            <h2 class="card-title dark:text-white">{{ item.title }}</h2>
            <p class="mt-2 mb-2 dark:text-white">{{ item.description }}</p>
            <div class="card-actions flex justify-end gap-5">
                <button class="h-10 bg-primary text-white" @click="show('Beginner')">Beginner</button>
                <button class="h-10 bg-primary text-white" @click="show('Intermediare')">Intermediare</button>
                <button class=" h-10 bg-primary text-white" @click="show('Advance')">Advance</button>
            </div>
        </div>
    </div>
</template>

<style></style>