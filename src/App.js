import React, { Component } from "react";
import SearchBar from "./Component/Searchbar";
import Container from "./Component/Container";
import ImageGallery from "./Component/ImageGallery";
import Button from "./Component/Button/Button";
import api from "./Servise/FetchImage";
import Modal from "./Component/Modal";
import ImageLoader from "./Component/Loader";

// import style from "./style.css";

class App extends Component {
  state = {
    page: 1,
    query: "",
    images: [],
    isLoading: false,
    showModal: false,
    url: "",
    tag: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      this.fetchImages()
        // eslint-disable-next-line
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    return api.findImage(query, page).then((images) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
        page: prevState.page + 1,
      }));
    });
  };

  handleOnButtonClick = () => {
    this.fetchImages()
      .then(() =>
        // eslint-disable-next-line
        window.scrollTo({
          // eslint-disable-next-line
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      )
      .catch((error) => alert(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormData = ({ query }) => {
    this.setState({
      page: 1,
      query,
      images: [],
    });
  };

  handleImageClick = ({ target }) => {
    if (target.nodeName !== "IMG") {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
      isLoading: true,
    });
    this.toggleModal();
  };

  toggleModal = () =>
    this.setState((prevState) => ({ showModal: !prevState.showModal }));

  hideLoaderInModal = () => this.setState({ isLoading: false });

  render() {
    const { images, isLoading, showModal, url, tag } = this.state;

    const showMoreBtn = isLoading && !showModal;
    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            {isLoading && <ImageLoader />}
            <img src={url} alt={tag} onLoad={this.hideLoaderInModal} />
          </Modal>
        )}
        <SearchBar onSubmit={this.handleFormData} />

        <ImageGallery images={images} onClick={this.handleImageClick} />
        {showMoreBtn && images.length !== 0 && <ImageLoader />}
        {!isLoading && images[0] && (
          <Button onClick={this.handleOnButtonClick} />
        )}
      </Container>
    );
  }
}

export default App;
