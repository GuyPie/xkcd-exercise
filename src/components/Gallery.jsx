import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

class Gallery extends Component {
  componentWillMount() {
    const { location: { image } } = this.props;

    if (!image) {
      window.location = '/';
    }
  }

  render() {
    const { location: { image } } = this.props;
    return (
      <div>
        <div className="backdrop" />
        <div className="gallery">
          <h2>{image.title}</h2>
          <img src={image.img} alt={image.alt} />
          <Link to="/">
            <button type="button">Close</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Gallery;
