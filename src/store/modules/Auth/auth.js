import axios from 'axios';
const state = {
    user: null,
    token: localStorage.getItem('authToken') || null // Persist token if available
};

const getters = {
    isAuthenticated: (state) => !!state.token, // Boolean check for authentication
    getUser: (state) => state.user
};

const mutations = {
    setUser: (state, user) => {
        state.user = user;
    },
    setToken: (state, token) => {
        state.token = token;
        localStorage.setItem('authToken', token); // Store token in localStorage
    },
    clearAuth: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('authToken'); // Remove token on logout
    }
};

const actions = {
    login: async ({ commit }, credentials) => {
        console.log('dkjhghsjaklnjbhvgfdgfhjk');

        try {
            const { data } = await axios.post('https://dreams-backend-1e16.onrender.com/api/auth/login', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // const data = await response.json();

            if (data.token) {
                commit('setToken', data.token);
                commit('setUser', data.user);
            }
            return data;
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Failed to authenticate');
        }
    },
    logout: ({ commit }) => {
        commit('clearAuth');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
