// store/modules/Auth/auth.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
// import { useRoute } from 'vue-router'

export const useAuthStore = defineStore(
    'auth',
    () => {
        // const route = useRoute();
        // const appProvided = inject('appProvided')

        const user = ref(null);
        const token = ref(null);
        const age = ref('23');

        const isAuthenticated = computed(() => !!token.value);
        const getUser = computed(() => user.value);
        const getAge = computed(() => age.value);

        function login(newToken, newUser) {
            token.value = newToken;
            user.value = newUser;
        }

        function logout() {
            token.value = null;
            user.value = null;
        }

        return { user, token, isAuthenticated, getUser, login, logout, getAge };
    },
    {
        persist: {
            paths: ['token', 'user'],
            storage: localStorage
        }
    }
);
