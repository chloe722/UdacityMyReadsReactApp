import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        authors: PropTypes.array, // Removed .isRequired since some books dont have 'authors' props
        cover: PropTypes.string,
        shelf: PropTypes.string,
        updateShelf: PropTypes.func.isRequired
    }

    coverImage() {
      return this.props.cover || 'https://via.placeholder.com/128x193?text=No%20Cover'
    }

    render(){
      return (
        <li>
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.coverImage()})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.shelf || 'none'} onChange={e => this.props.updateShelf(e.target.value)}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
      </li>
      )
    }
}

export default Book;