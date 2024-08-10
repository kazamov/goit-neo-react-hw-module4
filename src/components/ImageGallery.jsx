import ImageCard from './ImageCard';

import classes from './ImageGallery.module.css';

function ImageGallery({ images, onClick }) {
  return (
    <ul className={classes['image-gallery']}>
      {images.map(image => {
        return (
          <li key={image.id}>
            <ImageCard image={image} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
