<script setup>
import { computed, ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { RouterLink } from 'vue-router';
import store from "../store";
import router from '../router'
import DarkModeSwitcher from './header/DarkModeSwitcher.vue';
import LanguageButton from './header/LanguageButton.vue';
const dropdownOpen = ref(false)
const { isOpen } = useSidebar();
const firebaseUser = computed(() => {
  return store.state.firebaseUser;
});
const logout = async () => {
  await store.dispatch('logout');
  router.push('/');
}
</script>

<template>
  <header class="flex items-center  justify-between px-6 py-4 bg-white border-b-4 border-indigo-600 dark:bg-boxdark">
    <div class="flex items-center">
      <button class="text-gray-500 dark:text-white dark:bg-indigo-800 focus:outline-none lg:hidden bg-white"
        @click="isOpen = true">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <div class=" flex items-center gap-8  justify-end ">


      <DarkModeSwitcher class="focus:outline-none hidden lg:block" />
      <div class="flex items-center gap-5">
        <LanguageButton class="focus:outline-none hidden lg:block" />
        <router-link to="/free_trial" v-if="!firebaseUser" class="focus:outline-none">Sign
          up</router-link>
        <router-link to="/login" v-if="!firebaseUser" class="focus:outline-none">Login</router-link>
        <div class="relative" v-if="firebaseUser">
          <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            @click="dropdownOpen = !dropdownOpen"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Bordered avatar">

          <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false" />

          <transition enter-active-class="transition duration-150 ease-out transform"
            enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0">

            <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
              <a href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                @click="logout">
                Log out
              </a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>
