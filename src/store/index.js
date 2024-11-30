import { createStore } from 'vuex';

// Import modules
import auth from './modules/Auth/auth';

const store = createStore({
    modules: {
        auth
    }
});

export default store;
