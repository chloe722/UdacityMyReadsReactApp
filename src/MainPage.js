import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import BookShelf from './BookShelf'
import Layout from './Layout'

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
        return this.state.books.filter(book => book.shelf === shelfName).map(book =>
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
                return {...book, shelf: shelf}
                } else {
                return book
                }
            })
            }
        })
    }

    render(){
        return <Layout>
          <BookShelf label="Currently Reading">
              {this.getShelfBooks("currentlyReading")}
          </BookShelf>
          <BookShelf label="Want to Read">
              {this.getShelfBooks("wantToRead")}
          </BookShelf>
          <BookShelf label="Read">
              {this.getShelfBooks("read")}
          </BookShelf>
        </Layout>
    }
}


export default MainPage