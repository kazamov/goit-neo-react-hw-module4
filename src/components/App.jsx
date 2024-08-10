import { useCallback, useMemo, useState } from 'react';

import ImagesGallery from './ImageGallery';
import Loader from './Loader';
import LoaderMoreButton from './LoadMoreBtn';
import SearchBar from './SearchBar';
import ErrorMessage from './ErrorMessage';
import ImageModal from './ImageModal';
import useUnsplashApi from './useUnsplashApi';

import classes from './App.module.css';

function App() {
  const { fetchImages, error, images, setImages, totalPages, setTotalPages, loading } =
    useUnsplashApi();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchQuery = useCallback(
    searchQuery => {
      setPage(1);
      setQuery(searchQuery);
      if (searchQuery) {
        fetchImages(searchQuery, 1);
      }
    },
    [fetchImages],
  );

  const handleSearchError = useCallback(() => {
    setPage(1);
    setQuery('');
    setImages([]);
    setTotalPages(-1);
  }, [setImages, setTotalPages]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  }, [fetchImages, page, query]);

  const handleImageClick = useCallback(image => {
    setSelectedImage(image);
  }, []);

  const pageContent = useMemo(() => {
    if (error) {
      return <ErrorMessage />;
    }

    return (
      <>
        {images.length > 0 && <ImagesGallery images={images} onClick={handleImageClick} />}
        <Loader visible={loading} />
        {!loading && totalPages !== -1 && page < totalPages && (
          <LoaderMoreButton onClick={handleLoadMore} />
        )}
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      </>
    );
  }, [error, handleImageClick, handleLoadMore, images, loading, page, selectedImage, totalPages]);

  return (
    <div className={classes['app']}>
      <SearchBar onSubmit={handleSearchQuery} onError={handleSearchError} />
      {pageContent}
    </div>
  );
}

export default App;
