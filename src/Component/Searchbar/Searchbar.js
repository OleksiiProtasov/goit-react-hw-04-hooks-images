// import React, { Component } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";

export default function Searchbar({ onSubmitBar }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("enter name image what you want");
      return;
    }

    onSubmitBar(query);
    setQuery("");
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={style.button}>
          <span className={style.buttonLabel}>Search</span>
        </button>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="𝚂𝚎𝚊𝚛𝚌𝚑 𝚒𝚖𝚊𝚐𝚎𝚜 "
          onChange={handleInputChange}
          value={query}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitBar: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   state = {
//     query: "",
//   };

//   handleInputChange = (e) => {
//     const { value } = e.target;
//     this.setState({ query: value });
//   };

//   handleFormSubmit = (e) => {
//     e.preventDefault();
//     this.props.onSubmit(this.state);
//   };

//   handleClearSearchbar = () => {
//     this.setState({ query: "" });
//   };

//   render() {
//     const { query } = this.state;
//     return (
//       <header className={style.Searchbar}>
//         <form className={style.SearchForm} onSubmit={this.handleFormSubmit}>
//           <button type="submit" className={style.button}>
//             <span className={style.buttonLabel}>Search</span>
//           </button>
//           <input
//             className={style.input}
//             type="text"
//             autoComplete="off"
//             // eslint-disable-next-line
//             autoFocus
//             placeholder="𝚂𝚎𝚊𝚛𝚌𝚑 𝚒𝚖𝚊𝚐𝚎𝚜 "
//             onChange={this.handleInputChange}
//             onClick={this.handleClearSearchbar}
//             value={query}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Searchbar;
