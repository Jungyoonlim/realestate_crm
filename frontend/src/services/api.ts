import axios from 'axios';

interface LoginCredentials {
    email: string;
    password: string; 
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
});

// Auth endpoints
export const login = async (credentials: LoginCredentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data; 
}

// Property endpoints
export const fetchProperties = async () => {
    const response = await api.get('/properties/');
    return response.data; 
};

export const fetchPropertyById = async (id: number) => {
    const response = await api.get(`/properties/${id}/`);
    return response.data;
};

export const createProperty = async (propertyData: any) => {
    const response = await api.post('/properties/', propertyData);
    return response.data;
};

export const updateProperty = async (id: number, propertyData: any) => {
    const response = await api.put(`/properties/${id}/`, propertyData);
    return response.data;
};

export const deleteProperty = async (id: number) => {
    const response = await api.delete(`/properties/${id}/`);
    return response.data;
}; 