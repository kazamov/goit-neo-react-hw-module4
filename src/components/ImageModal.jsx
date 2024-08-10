import Modal from 'react-modal';

import classes from './ImageModal.module.css';

Modal.setAppElement('#root');

function ImageModal({ image, onClose }) {
  return (
    <Modal
      isOpen={Boolean(image)}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      overlayClassName={classes['overlay']}
      className={classes['modal']}
    >
      {image && <img src={image.urls.regular} alt={image.alt_description} />}
    </Modal>
  );
}

export default ImageModal;
