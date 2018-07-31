import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import Book from './Book'
import SearchPage from './SearchPage'
import './App.css'

class MainPage extends React.Component{

    state={
        books: [],
    }

    componentDidMount() {
        this.fetchBooks()
    }

    fetchBooks() {
        BooksAPI.getAll().then(books => {
            console.log('books', books)
            this.setState({
            books
            })
        })
    }

    getShelfBooks(shelfName){
        return this.state.books.filter(book => book.shelf == shelfName).map(book =>
            <Book
                key={book.id}
                title={book.title}
                authors={book.authors}
                cover={book.imageLinks.thumbnail}
                shelf={book.shelf}
                updateShelf={shelfName => this.updateShelf(book.id, shelfName)}
            />
        )
    }

    updateShelf(bookId, shelf) {
        BooksAPI.update({id: bookId}, shelf)
        this.setState(state => {
            return {
            books: state.books.map(book => {
                if(bookId === book.id) {
                return {... book, shelf: shelf}
                } else {
                return book
                }
            })
            }
        })
    }

    render(){

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getShelfBooks("currentlyReading")}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getShelfBooks("wantToRead")}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getShelfBooks("read")}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}


export default MainPage