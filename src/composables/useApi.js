import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://dreams-backend-1e16.onrender.com/', // Your backend URL
    timeout: 10000 // Request timeout
});

// Add request interceptor to attach headers (e.g., Authorization)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Example: Fetch token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error.response?.data || error.message); // Throw the error
    }
);

// The common API method
const useApi = () => {
    const apiRequest = async ({ method, url, data = null, params = null }) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiClient({
                method,
                url,
                data,
                params
            });
            return response.data; // Return only the response data
        } catch (error) {
            throw error; // Throw error to handle in components
        }
    };

    return { apiRequest }; // Expose the common method
};

export default useApi;
