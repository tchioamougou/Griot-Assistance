import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import messages from './lang/index';
const i18n = createI18n({
    legacy: false,
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
})
const app = createApp(App)
app.use(router);
app.use(createPinia())
app.use(i18n);
app.mount('#app')
