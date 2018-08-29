import React, { Component } from 'react';
import { debounce } from 'lodash';
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
      <div id="app" className="app">
        <div className="header">
          <h1>{`Loaded ${comics.length} comics!`}</h1>
        </div>
        <div className="comics">
          {comics.map(comic => {
            return (
              <img src={comic.data.img} alt={comic.data.alt} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
