// import React, { Component } from "react";
// eslint-disable-next-line
import { useState, useEffect } from "react";
import SearchBar from "./Component/Searchbar";
import Container from "./Component/Container";
import ImageGallery from "./Component/ImageGallery";
import Button from "./Component/Button/Button";
import Api from "./Servise/FetchImage";
import Modal from "./Component/Modal";
import ImageLoader from "./Component/Loader";

// import style from "./style.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [image, setImage] = useState([]);
  const [currentImg, setCurrentImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
    const fetchPics = async () => {
      isLoadingToggle();

      return Api.findImage(query, page)
        .then((pic) => setImage((prevState) => [...prevState, ...pic]))
        .finally(() => isLoadingToggle());
    };
    fetchPics();
  }, [query, page]);

  const loadMoreBtn = () => {
    setPage((prevState) => prevState + 1);
    if (query) {
      isLoadingToggle();
      scrollPageBtn();
      isLoadingToggle();
    }
  };

  const scrollPageBtn = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 400);
  };

  const handleFormData = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImage([]);
  };

  const handleImageClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setCurrentImg(e.target.dataset.img);

    toggleModal();
  };

  const isLoadingToggle = () => {
    setIsLoading((prevState) => !prevState);
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const hideLoaderInModal = () => setShowModal({ isLoading: false });

  const showMoreBtn = isLoading && !showModal;

  return (
    <Container>
      {showModal && (
        <Modal onClose={toggleModal} onClick={handleImageClick}>
          {isLoading && <ImageLoader />}
          <img src={currentImg} alt="Images" onLoad={hideLoaderInModal} />
        </Modal>
      )}
      <SearchBar onSubmitBar={handleFormData} />

      <ImageGallery image={image} onClick={handleImageClick} />
      {showMoreBtn && image.length !== 0 && <ImageLoader />}
      {!isLoading && image[0] && <Button onClick={loadMoreBtn} />}
    </Container>
  );
}

// class App extends Component {
//   state = {
//     page: 1,
//     query: "",
//     images: [],
//     isLoading: false,
//     showModal: false,
//     url: "",
//     tag: "",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query } = this.state;
//     if (query !== prevState.query) {
//       this.fetchImages()
//         // eslint-disable-next-line
//         .catch((error) => this.setState({ error }))
//         .finally(() => this.setState({ isLoading: false }));
//     }
//   }

//   fetchImages = () => {
//     const { query, page } = this.state;
//     this.setState({ isLoading: true });
//     return api.findImage(query, page).then((images) => {
//       this.setState((prevState) => ({
//         images: [...prevState.images, ...images],
//         page: prevState.page + 1,
//       }));
//     });
//   };

//   handleOnButtonClick = () => {
//     this.fetchImages()
//       .then(() =>
//         // eslint-disable-next-line
//         window.scrollTo({
//           // eslint-disable-next-line
//           top: document.documentElement.scrollHeight,
//           behavior: "smooth",
//         })
//       )
//       .catch((error) => alert(error))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   handleFormData = ( query ) => {
//     this.setState({
//       page: 1,
//       query,
//       images: [],
//     });
//   };

//   handleImageClick = ({ target }) => {
//     if (target.nodeName !== "IMG") {
//       return;
//     }
//     const { url } = target.dataset;
//     const tag = target.alt;
//     this.setState({
//       url,
//       tag,
//       isLoading: true,
//     });
//     this.toggleModal();
//   };

//   toggleModal = () =>
//     this.setState((prevState) => ({ showModal: !prevState.showModal }));

//   hideLoaderInModal = () => this.setState({ isLoading: false });

//   render() {
//     const { images, isLoading, showModal, url, tag } = this.state;

//     const showMoreBtn = isLoading && !showModal;
//     return (
//       <Container>
//         {showModal && (
//           <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
//             {isLoading && <ImageLoader />}
//             <img src={url} alt={tag} onLoad={this.hideLoaderInModal} />
//           </Modal>
//         )}
//         <SearchBar onSubmitBar={this.handleFormData} />

//         <ImageGallery images={images} onClick={this.handleImageClick} />
//         {showMoreBtn && images.length !== 0 && <ImageLoader />}
//         {!isLoading && images[0] && (
//           <Button onClick={this.handleOnButtonClick} />
//         )}
//       </Container>
//     );
//   }
// }

// export default App;
