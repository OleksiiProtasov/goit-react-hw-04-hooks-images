import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleClearSearchbar = () => {
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>
          <input
            className={style.input}
            type="text"
            autoComplete="off"
            // eslint-disable-next-line
            autoFocus
            placeholder="𝚂𝚎𝚊𝚛𝚌𝚑 𝚒𝚖𝚊𝚐𝚎𝚜 "
            onChange={this.handleInputChange}
            onClick={this.handleClearSearchbar}
            value={query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
