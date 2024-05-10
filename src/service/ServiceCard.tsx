import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

interface ErrorResponse {
  message: string;
}

export async function createList(data: any) {
  try {
    const response = await api.post('/lists/create', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? 'Erro desconhecido ao criar lista');
  }
}


export async function getAllLists() {
  try {
    const response = await api.get('/lists');
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? 'Erro desconhecido ao buscar listas');
  }
}


export async function getListById(id: number) {
  try {
    const response = await api.get(`/lists/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? 'Erro desconhecido ao buscar lista por ID');
  }
}


export async function searchListsByTitle(title: string) {
  try {
    const response = await api.get(`/lists/search?title=${title}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? 'Erro desconhecido ao buscar listas por título');
  }
}


export async function updateList(id: number, data: any) {
  try {
    const response = await api.put(`/lists/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? 'Erro desconhecido ao atualizar lista');
  }
}

export async function updateFavoriteStatus(id: number, isFavorite: number) {
  try {
    await api.put(`/lists/${id}`, { is_favorite: isFavorite });
  } catch (error) {
    throw new Error('Erro desconhecido ao atualizar estado de favorito');
  }
}

export async function updateCardColor(id: number, color: number) {
  try {
    await api.put(`/lists/${id}`, { color });
  } catch (error) {
    throw new Error('Erro desconhecido ao atualizar a cor do card');
  }
}

export async function deleteList(id: number) {
  try {
    const response = await api.delete(`/lists/delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message ?? 'Erro desconhecido ao excluir lista');
  }
}
