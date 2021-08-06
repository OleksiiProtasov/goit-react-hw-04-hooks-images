// import React, { Component } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import style from "./style.module.css";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={style.Overlay} onClick={onClose}>
      <div className={style.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

// export default class Modal extends Component {
//   componentDidMount() {
//     // eslint-disable-next-line
//     window.addEventListener("keydown", this.closeModalEsc);
//   }

//   componentWillUnmount() {
//     // eslint-disable-next-line
//     window.removeEventListener("keydown", this.closeModalEsc);
//   }

//   closeModalEsc = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       // eslint-disable-next-line
//       <div className={style.Overlay} onClick={this.handleBackdropClick}>
//         <div className={style.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };
