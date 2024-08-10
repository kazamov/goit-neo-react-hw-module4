import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com';
const API_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const IMAGES_PER_PAGE = 12;

function transformImageData(data) {
  return {
    id: data.id,
    alt_description: data.alt_description,
    width: data.width,
    height: data.height,
    urls: {
      regular: data.urls.regular,
      small: data.urls.small,
    },
  };
}

const useUnsplashApi = () => {
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async (query, page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/search/photos`, {
        params: {
          query,
          page,
          per_page: IMAGES_PER_PAGE,
          orientation: 'landscape',
        },
        headers: {
          'Accept-Version': 'v1',
          // eslint-disable-next-line no-undef
          Authorization: `Client-ID ${API_ACCESS_KEY}`,
        },
      });

      const data = response.data;

      setImages(prevState => prevState.concat(data.results.map(transformImageData)));
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { images, setImages, totalPages, setTotalPages, loading, error, fetchImages };
};

export default useUnsplashApi;
