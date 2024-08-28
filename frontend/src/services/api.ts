import axios from 'axios';

interface LoginCredentials {
    email: string;
    password: string; 
}


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
});

export const login = async (credentials: LoginCredentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data; 
}

export const fetchProperties = async (params: Record<string, any>) => {
    const response = await api.get('/properties', { params });
    return response.data; 
};

// Add more API methods


export default api; 