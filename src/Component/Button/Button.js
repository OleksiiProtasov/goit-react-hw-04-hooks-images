import React from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={style.Button}>
    load more...
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
