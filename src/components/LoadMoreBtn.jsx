import classes from './LoadMoreBtn.module.css';

function LoaderMoreButton({ onClick }) {
  return (
    <button className={classes['load-more-button']} onClick={onClick}>
      Load more
    </button>
  );
}

export default LoaderMoreButton;
