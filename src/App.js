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

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(
      BooksAPI.getAll().then((books) => {
      this.setState({books})
        }))
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/' render = {() => (
        <BookList
          books={this.state.books}
          changeShelf={this.changeShelf}

         />
      )}/>
      <Route path='/booksearch' render = {() => (
        <BookSearch
          changeShelf={this.changeShelf}
          books={this.state.books}
        />
      )}/>
      </div>
    )
  }
}

export default BooksApp;
