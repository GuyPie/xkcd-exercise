import React, { Component } from 'react';
import logo from './logo.svg';
import { getComics } from './api/xkcd';
import './App.css';

class App extends Component {
  state = {
    comics: []
  }

  async componentDidMount() {
    const comics = await getComics(1, 10);
    this.setState({
      comics,
    });
  }

  render() {
    const { comics } = this.state;

    return (
      <div className="app">
        <div className="comics">
          {comics.map(comic => <img src={comic.data.img} alt={comic.data.alt} />)}
        </div>
      </div>
    );
  }
}

export default App;
