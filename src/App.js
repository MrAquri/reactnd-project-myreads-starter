import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList.js'
import BookSearch from './BookSearch.js'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }


  render() {
    return (
      <div className="app">
      <Route exact path='/' render = {() => (
        <BookList
        books={this.state.books}
         />
      )}/>
      <Route path='/booksearch' render = {() => (
        <BookSearch />
      )}/>
      </div>
    )
  }
}

export default BooksApp;
