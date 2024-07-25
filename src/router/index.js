import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/Home.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/courses',
        name: 'courses',
        component: () => import('../view/courses/CoursesList.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/learning',
        name: 'learning',
        component: () => import('../view/learning/LearningList.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/cv_assistance',
        name: 'cv_assistance',
        component: () => import('../view/assistance/CvAssistance.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/interviews',
        name: 'interviews',
        component: () => import('../view/interviews/InterviewsList.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/auth/Login.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/free_trial',
        name: 'free_trial',
        component: () => import('../view/auth/Price.vue'),
        meta: {
            title: ' Dashboard'
        }
    },
    {
        path: '/cv_assistance',
        name: 'cv_assistance',
        component: () => import('../view/cv/cvAnalyse.vue'),
        meta: {
            title: ' Dashboard'
        }
    },

    {
        path: '/interviews',
        name: 'interviews',
        component: () => import('../view/interviews/InterviewList.vue'),
        meta: {
            title: ' Dashboard'
        }
    },

    {
        path: '/learning',
        name: 'learning',
        component: () => import('../view/learning/LearningList.vue'),
        meta: {
            title: ' Learning'
        }
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    next();
})

export default router
