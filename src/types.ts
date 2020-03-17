export interface GifsRequestParams {
  q: string;
  limit?: number;
  offset?: number;
  rating?: string;
  lang?: string;
  random_id?: string;
}

export interface Gif {
  id: string;
  url: string;
}

export interface GifResponse {
  id: string;
  images: {
    preview_gif: {
      url: string;
    };
  };
}
