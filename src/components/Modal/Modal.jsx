import { Component } from 'react';
import PropTypes from "prop-types";
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  }

    handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    const { image, tags } = this.props;
    return (
      <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
    <div className={css.modalOverlay}>
          <img src={image} alt={tags} />
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}



// export const Modal = ({image, tags, onClose}) => {
//   return (
//     <div className={css.modalBackdrop} onClick={onClose}>
//       <div className={css.modalOverlay}>
//         <img src={image} alt={tags} />
//       </div>
//     </div>
//   );
// }
