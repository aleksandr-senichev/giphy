import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GifsRequestParams, GifResponse } from './types';

export const API_BASE_URL = 'https://api.giphy.com/v1/';
export const API_TIMEOUT = 1000;
export const API_KEY = 'T2pGYsjwUbJxh1vafozAqoZPg547ETKs';

export const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  timeout: API_TIMEOUT,
});

client.interceptors.request.use((config: AxiosRequestConfig) => {
  config.params['api_key'] = API_KEY;
  return config;
});

export const Gifs = {
  search: (params: GifsRequestParams) => {
    return client.get(`gifs/search`, {
      params: {
        ...params,
        limit: 20,
      },
      transformResponse: transformGifsSearchResponse,
    });
  },
};

const transformGifsSearchResponse = (data: string) => {
  try {
    const { data: rawGifs }: { data: GifResponse[] } = JSON.parse(data);
    const gifs = rawGifs.map(gif => ({
      id: gif.id,
      url: gif.images['preview_gif'].url,
    }));
    return gifs;
  } catch (error) {
    return [];
  }
};
