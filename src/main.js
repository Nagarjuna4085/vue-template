import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
const pinia = createPinia();

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

const app = createApp(App);
pinia.use(piniaPersistedState);

app.use(router);
app.use(pinia);
// const userStore = useUserStore();
// console.log(userStore);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
