<script setup>
import { defineAsyncComponent, onBeforeMount } from 'vue';
import ChatBot from './view/ChatBot.vue';
const DashboardLayout = defineAsyncComponent(() => import('./components/DashboardLayout.vue'))
import { useI18n } from "vue-i18n";
import stores from './store';
const t = useI18n({ useScope: "global" });
onBeforeMount(() => {
  if (!stores.state.language) {
    stores.dispatch('setLanguage', t.locale.value);
  } else {
    t.locale.value = stores.state.language;
  }
})
</script>

<template>
  <DashboardLayout>
    <template v-slot:default>
      <router-view></router-view>
    </template>
  </DashboardLayout>
  <!-- <chat-bot></chat-bot>-->
</template>

<style scoped></style>
