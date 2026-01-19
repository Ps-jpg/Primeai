const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// Create headers with auth token
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// Handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'API request failed');
    }
    return data;
};

// Auth API functions
export const authApi = {
    // Register
    register: async (userData) => {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    // Login
    login: async (credentials) => {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    },

    // Get current user
    getMe: async () => {
        const response = await fetch(`${API_BASE}/auth/me`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};

// Task API functions
export const taskApi = {
    // Get all tasks
    getAll: async () => {
        const response = await fetch(`${API_BASE}/tasks`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    // Get single task
    getOne: async (id) => {
        const response = await fetch(`${API_BASE}/tasks/${id}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    // Create task
    create: async (taskData) => {
        const response = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(taskData),
        });
        return handleResponse(response);
    },

    // Update task
    update: async (id, taskData) => {
        const response = await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(taskData),
        });
        return handleResponse(response);
    },

    // Delete task
    delete: async (id) => {
        const response = await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};

export default taskApi;
