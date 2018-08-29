import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Gallery from './components/Gallery';
import { getComics } from './api/xkcd';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      nextLoadStartIndex: 1,
      comics: [],
      loadMore: true,
    };
    this.trackScrolling = debounce(this.trackScrolling.bind(this), 200);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.trackScrolling();
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  
  async trackScrolling() {
    const { nextLoadStartIndex: startIndex, comics: currComics, loadMore } = this.state;

    if (!loadMore) return;

    const el = document.getElementById('app');

    if (Math.floor(el.getBoundingClientRect().bottom) <= window.innerHeight + 20) {
      console.log('header bottom reached');

      try {
        const comics = await getComics(startIndex, startIndex + 10);
        this.setState({
          comics: currComics.concat(comics),
          nextLoadStartIndex: startIndex + 10,
          loadMore: true,
        });
      } catch (e) {
        this.setState({
          comics: currComics,
          loadMore: false,
        });
      }
    }
  };

  render() {
    const { comics } = this.state;

    return (
      <BrowserRouter>
        <div id="app" className="app">
          <div className="header">
            <h1>{`Loaded ${comics.length} comics!`}</h1>
          </div>
          <div className="comics">
            {comics.map(comic => (
              <Link to={{
                pathname: `/gallery/${comic.data.num}`,
                image: comic.data ,
              }}>
                <img src={comic.data.img} alt={comic.data.alt} />
              </Link>
            ))}
          </div>
          <Route path="/gallery" component={Gallery} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
