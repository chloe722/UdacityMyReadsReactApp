import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {
  state = {

    query: '',
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchBooks: [],
    showSearchPage: false
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
    console.log('shelf', shelf)

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

  updateQuery(query){
    this.setState( {query: query.trim()} ) //We dont wanna update existing query, instead, create new one
  }

  getSearchBooks(showingBooks){
    return showingBooks.map(book =>
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

  search(term){
    this.updateQuery(term)
    if(term){
      BooksAPI.search(term).then(result => {
        this.setState({
          searchBooks: result && result.length > 0 ? result : []
        })
      })
    } else {
      this.setState({searchBooks: []})
    }
  }

  closeSearch(){
    this.setState({ showSearchPage: false })
    this.fetchBooks()
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.closeSearch()}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=>this.search(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.getSearchBooks(this.state.searchBooks)}
              </ol>
            </div>
          </div>
        ) : (
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
              <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
