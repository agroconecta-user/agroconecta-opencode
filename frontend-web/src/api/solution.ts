import { CreateSolutionForm } from '../types/solution';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4023/';
const API_ROUTE = API_URL + '/solutions'; 

export const getSolutions = async (category: string) => {
    let url = API_ROUTE;
    if (category && category.trim() !== '') {
        url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const getSolution = async (id: string) => {
    const response = await fetch(`${API_ROUTE}/${id}`);
    if (!response.ok) {
        throw new Error(`Erro ao buscar solução: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const createSolution = async (solution: CreateSolutionForm, adminToken: string) => {
    const response = await fetch(`${API_ROUTE}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(solution),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('❌ Erro na resposta:', response.status, errorBody);
        throw new Error(`Request failed with status ${response.status}. Body: ${errorBody}`);
    }

    const data = await response.json();
    return data;
};

export const deleteSolution = async (id: string, adminToken: string) => {
    const response = await fetch(`${API_ROUTE}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${adminToken}`
        }
    });
    if (!response.ok) {
        throw new Error(`Erro ao deletar solução: ${response.status}`);
    }
    const data = await response.json();
    return data;
};