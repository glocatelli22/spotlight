import axios from 'axios';

const TMDB =  axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        api_key: process.env.apiKey,
        language: process.env.language
    }
});

export const fetchTMDB = async (url: string, queryObj?: {}) => {
    try {
        const response = await TMDB.get(url, { params: queryObj });
        if(!response.data) {
            throw new Error('Si è verificato un errore nel recuperare i dati... Riprova');
        }
        return response.data;

    } catch(e: any) {
        return {
            error: e.message
        };
    }
};

export * from './settings';
