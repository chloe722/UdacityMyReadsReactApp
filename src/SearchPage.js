import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'


class SearchPage extends React.Component {
    state = {
        query: '',
        searchBooks: [],
        bookIdShelf: {}
    }

      getSearchBooks(showingBooks){
        return showingBooks.map(book =>
          <Book
            key={book.id}
            title={book.title}
            authors={book.authors}
            cover={book.imageLinks? book.imageLinks.thumbnail : "" }
            shelf={this.state.bookIdShelf[book.id]}
            updateShelf={shelfName => this.updateShelf(book.id, shelfName)}
          />
        )
      }
    
      search(query){
        this.setState( {query} ) //We dont wanna update existing query, instead, create new one
        if(query){
          BooksAPI.search(query.trim()).then(result => {
            if(query === this.state.query) { // response can arrive late, and query term might have changed
                this.setState({
                  searchBooks: result && result.length > 0 ? result : []
                })
            }
          })
        } else {
          this.setState({searchBooks: []})
        }
      }

      updateShelf(bookId, shelf) {
        BooksAPI.update({id: bookId}, shelf)
        this.setState({
            bookIdShelf: {...this.state.bookIdShelf, [bookId]: shelf}
        })
      }

      componentDidMount() {
          BooksAPI.getAll().then(books => {
              let bookIdShelf = {}
              for(let book of books) {
                  bookIdShelf[book.id] = book.shelf
              }
              this.setState({bookIdShelf})
          })
      }

    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=>this.search(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.getSearchBooks(this.state.searchBooks)}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchPage;