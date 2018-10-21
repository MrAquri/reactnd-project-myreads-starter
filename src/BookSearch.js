import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookSearch extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({query: query})
    this.searchingBooks(query);
  }

  searchingBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        this.setState({ searchedBooks: searchedBooks })
      })
    } else {
        this.setState({searchedBooks: [] })
    }
  }


  render() {
/*
    let showingBooks
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.props.books.filter((book) => match.test(book.name))
    } else {
      showingBooks = this.props.books
    }
*/
//    showingBooks.sort(sortBy('name'))

    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link className='close-search' to='/'>Close</Link>

          <div className="search-books-input-wrapper">

            <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map(searchedBook => (
              <li key={searchedBook.id}>
                <Book
                  book={searchedBook}
                />
              </li>
            ))}
          </ol>

        </div>
      </div>
    )
  }
}

export default BookSearch;
