import { useCallback, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { GoSearch } from 'react-icons/go';
import toast, { Toaster } from 'react-hot-toast';

import classes from './SearchBar.module.css';

function SearchBar({ onSubmit, onError }) {
  const [showScrolledState, setShowScrolledState] = useState(false);
  const isScrolledRef = useRef(false);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const searchQuery = event.currentTarget.elements['search-query'].value;

      if (!searchQuery) {
        onError();
        toast.error('Please enter a search query');
        return;
      }

      onSubmit(searchQuery);
    },
    [onSubmit, onError],
  );

  useEffect(() => {
    const handlePageScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop >= 2 && !isScrolledRef.current) {
        setShowScrolledState(true);
        isScrolledRef.current = true;
      } else if (scrollTop < 2 && isScrolledRef.current) {
        setShowScrolledState(false);
        isScrolledRef.current = false;
      }
    };

    window.addEventListener('scroll', handlePageScroll);

    return () => {
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, []);

  return (
    <header
      className={clsx(classes['search-bar'], {
        [classes['search-bar-scrolled']]: showScrolledState,
      })}
    >
      <form onSubmit={handleSubmit}>
        <div className={classes['search-input-container']}>
          <input
            type="text"
            name="search-query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" aria-label="Search images">
            <GoSearch />
          </button>
        </div>
      </form>
      <Toaster position="top-center" containerStyle={{ top: 70 }} />
    </header>
  );
}

export default SearchBar;
