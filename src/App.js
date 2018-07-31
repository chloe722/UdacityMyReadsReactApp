import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app"> 
          <Route path="/search" component={SearchPage}/>
          <Route path="/" exact component={MainPage}/>
      </div>
    )
  }
}

export default BooksApp
