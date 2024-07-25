<script setup>
import { defineAsyncComponent } from 'vue';
import ChatBot from './view/ChatBot.vue';
import ChatCv from './view/ChatCv.vue';
const DashboardLayout = defineAsyncComponent(() => import('./components/DashboardLayout.vue'))
ChatCv
</script>

<template>
  <DashboardLayout>
    <template v-slot:default>
      <router-view></router-view>
    </template>
  </DashboardLayout>
  <chat-bot></chat-bot>
</template>

<style scoped></style>
