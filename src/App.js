// Creating a project I used a general idea of knowledge provided in tutorials/websites:
// Udacity - Building with React Lessons
// Student Jam - created by Maeva Nap (https://www.youtube.com/watch?v=acJHkd6K5kI&t=3461s)
// Tutorial - created by Ryan Waite (https://www.youtube.com/watch?v=i6L2jLHV9j8&t=10006s)
// https://stackoverflow.com
// https://study-hall.udacity.com/

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
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  // When the shelf is changed the server is updated, then there is an update on the client side
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.title !== book.title).concat([book])
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
