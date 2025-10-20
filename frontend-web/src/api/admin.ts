const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4023/';
const API_ROUTE = API_URL + '/auth';

export const AuthAdmin = async (adminData: { name: string; password: string }) => {
    const response = await fetch(`${API_ROUTE}/admin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('❌ Erro na resposta:', response.status, errorBody);
        throw new Error(`Request failed with status ${response.status}. Body: ${errorBody}`);
    }

    const token = await response.json();
    localStorage.setItem('token', token);
    return token;
};