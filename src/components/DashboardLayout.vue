<script setup>
import { defineAsyncComponent } from 'vue';
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'));
const Header = defineAsyncComponent(() => import('./Header.vue'));
</script>

<template>
  <div class="flex h-screen  dark:bg-black  bg-white text-black font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="lg:container mx-auto px-3 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
