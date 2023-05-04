import { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34260736-34eeaa34875fe4dc0dfd398f9';
export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    largeImage: '',
    isLoading: false,
    isVisible: false,
    total_hits: null,
    perPage: 12,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const newSearchQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevSearchQuery !== newSearchQuery || newPage !== prevPage) {
      this.setState({ isLoading: true, isVisible: false });
      this.getImages();
      } else if (prevState.isLoading !== this.state.isLoading) {
        this.setState({ isLoading: false });
    }
  }

  async getImages() {
    const { searchQuery, page, perPage } = this.state;
    if (!searchQuery) {
      return;
    }
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      this.setState(prevState => ({
        images: [
          ...prevState.images,
          ...this.normalizedData(response.data.hits),
        ],
        total_hits: response.data.totalHits,
        isVisible: Math.ceil(response.data.totalHits / perPage) !== page,
      }));

      if (response.data.totalHits === 0) {
        this.setState({ isVisible: false, isLoading: false });
        toast.error(
          'Sorry there are no images matching your search query. Please try again.',
          {
            theme: 'colored',
          }
        );
      }
    } catch (err) {
      console.log(err);
      } finally {
        this.setState({ isLoading: false });
    }
  }

  normalizedData(imagesArr) {
    return imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [], isVisible: false, isLoading: true });
  };

  onLoadMoreClick = () => {
    this.setState({ isLoading: true });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, isVisible } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} limit={1} />
        {isLoading && (
          <div className={css.Wrapper}>
            <Loader />
          </div>
        )}
        {images.length !== 0 && <ImageGallery images={images} />}
        {isVisible && (
          <div className={css.Wrapper}>
            <Button onClick={this.onLoadMoreClick} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Loading more'}
            </Button>
          </div>
        )}
      </>
    );
  }
}

//   try {
//     const response = await axios.get(
//       `?q=${this.statesearchQuery}&page=${this.state.page}&key=${API_KEY}`
//     );
//     if (response.data.totalHits === 0) {
//       toast.error(
//         'Sorry, there are no images mathcing your search. Please try again.',
//         {
//           theme: 'colored',
//         }
//       );
//       this.setState({ images: [], isLoading: false });
//       return;
//     }

//     // if (this.state.page === 1) {
//     //   this.setState({images: [...response.data.hits]})
//     // } else {
//     //   this.setState(prevState => ({
//     //     images: [
//     //       ...prevState.images,
//     //       ...this.normalizedData(response.data.hits),
//     //     ],
//     //   }));
//     // }
//     // if (this.state.page * this.state.perPage >= response.data.totalHits) {
//     //   this.setState({isLoadBtnHidden: true});
//     // }
//   } catch (err) {
//     console.log(err);
//   }
// }
