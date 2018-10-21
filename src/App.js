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

  // Fetching all the books after the page is loaded
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  // Changing current shelf and updating the book state
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
      <Route path='/search' render = {() => (
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
