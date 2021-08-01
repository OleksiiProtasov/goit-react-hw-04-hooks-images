import axios from "axios";

const KEY = "21935318-c1f2aed7e7c83eceedbf4cf2c";
axios.defaults.baseURL = "https://pixabay.com/api/";

const findImage = (searchQuery, currentPage) =>
  axios
    .get(
      `?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);

// eslint-disable-next-line
export default { findImage };
