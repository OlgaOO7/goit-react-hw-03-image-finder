import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  // handleBackdropClick = e => {
  //   if (e.currentTarget === e.target) {
  //     this.toggleModal();
  //   }
  // }

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    const { showModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal image={largeImageURL} tags={tags} onClose={this.toggleModal} />
        )}
        <li className={css.imageGalleryItem} onClick={this.toggleModal}>
          <img src={webformatURL} alt={tags} className={css.imageItem} />
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
