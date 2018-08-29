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
    };
    this.trackScrolling = debounce(this.trackScrolling.bind(this), 200);
  }

  async componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    const comics = await getComics(1, 11);
    this.setState({
      comics,
      nextLoadStartIndex: 11,
    });
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  
  async trackScrolling() {
    const { nextLoadStartIndex: startIndex, comics: currComics } = this.state;
    const el = document.getElementById('app');

    if (Math.floor(el.getBoundingClientRect().bottom) <= window.innerHeight) {
      console.log('header bottom reached');
      const comics = await getComics(startIndex, startIndex + 10);
      this.setState({
        comics: currComics.concat(comics),
        nextLoadStartIndex: startIndex + 10,
      });
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
            {comics.map(comic => {
              return (
                <Link to={{
                  pathname: `/gallery/${comic.data.num}`,
                  image: comic.data ,
                }}>
                  <img src={comic.data.img} alt={comic.data.alt} />
                </Link>
              );
            })}
          </div>
          <Route path="/gallery" component={Gallery} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
