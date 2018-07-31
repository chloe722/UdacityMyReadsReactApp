import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
    state = {
    
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        cover: PropTypes.string.isRequired,
        shelf: PropTypes.string,
        updateShelf: PropTypes.func.isRequired
    }

    render(){

      return (
        <li>
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.cover})` }}></div>
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