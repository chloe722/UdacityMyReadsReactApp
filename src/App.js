import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import NotFound from './NotFound'
import './App.css'


class BooksApp extends React.Component {

  render() {
    return (
      <div className="app"> 
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/search" exact component={SearchPage}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
