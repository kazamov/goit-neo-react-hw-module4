import classes from './ImageCard.module.css';

function ImageCard({ image, onClick }) {
  return (
    <div className={classes['image-card']} onClick={() => onClick(image)}>
      <img src={image.urls.regular} alt={image.alt_description} />
    </div>
  );
}

export default ImageCard;
