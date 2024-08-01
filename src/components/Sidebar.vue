<script setup>
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { useSidebarStore } from './../store/sidebar'
import { onClickOutside } from '@vueuse/core';
const { isOpen } = useSidebar()
const sidebarStore = useSidebarStore()

const target = ref(null)

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
});

const handleItemClick = (item) => {
  const pageName = sidebarStore.page === item.label ? '' : item.label
  sidebarStore.page = pageName;
  console.log('sidebarStore', pageName)
}

const items = ref([{
  label: "Courses",
  link: "/courses",
  name: "courses",
  icon: `<svg class="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
              fill="currentColor" />
            <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
          </svg>
`,
},
{
  label: "Learning",
  link: "/learning",
  name: "learning",
  icon: `<svg class="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
              fill="currentColor" />
            <path
              d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
              fill="currentColor" />
            <path
              d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
              fill="currentColor" />
          </svg>
`,
},
/*{
  label: "Coding",
  link: "/coding",
  name: "coding",
  icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd" />
          </svg>
`,
}, */{
  label: "CV Assistance",
  link: "/cv_assistance",
  name: "courses",
  icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
`,
},
{
  label: "Interview training",
  link: "/interviews",
  name: "interviews",
  icon: `          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
`,
}

])
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden" @click="isOpen = false" />
    <!-- End Backdrop -->

    <div ref="target" :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-black lg:translate-x-0 lg:static  dark:bg-boxdark lg:inset-0">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="./../assets/images/logo.png" class="h-12" />

          <span class="mx-2 text-2xl font-semibold text-white">Griot Assistance</span>
        </div>
      </div>
      <nav class="mt-10 ps-5">
        <div class="mb-6 flex flex-col gap-1.5">
          <router-link v-for="(it, i) in items" :key="i" @click.prevent="handleItemClick(it)" :to="it.link"
            class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
            :class="{
              'bg-graydark dark:bg-meta-4': sidebarStore.page === it.label
            }">
            <span v-html="it.icon"></span>
            <span class="mx-4">{{ $t(it.label) }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
