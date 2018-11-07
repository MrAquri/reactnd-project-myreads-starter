// Creating a project I used a general idea of knowledge provided in tutorials:
// https://www.youtube.com/watch?v=acJHkd6K5kI&t=3461s
// https://www.youtube.com/watch?v=i6L2jLHV9j8&t=10006s

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

  // When the shelf is changed the server is updated, then there is an update on the client side
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
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
