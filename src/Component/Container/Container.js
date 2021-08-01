import React from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";

const Container = ({ children }) => (
  <div className={style.Container}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
