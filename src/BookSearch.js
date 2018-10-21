import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'


class BookSearch extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  // Updating query state onChange from input filed
  updateQuery = (query) => {
    this.setState({query: query})
    this.searchingBooks(query);
  }

  // Searching for the books
  searchingBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        // On error seting the searchedBooks state to an empty array
        if (searchedBooks.error) {
          this.setState({searchedBooks: [] })
        } else {
            this.setState({ searchedBooks: searchedBooks })
        }
      })
    } else {
        this.setState({searchedBooks: [] })
    }
  }

  render() {

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
            {this.state.searchedBooks.map(searchedBook => {
              let shelf = 'none';

      //Maps through the books array and check if the book is on the main page
              this.props.books.map(book => (
                book.id === searchedBook.id ? shelf = book.shelf : ''
              ))

              return (
                <li key={searchedBook.id}>
                <Book
                  book={searchedBook}
                  changeShelf={this.props.changeShelf}
                  currentShelf={shelf}
                />
              </li>
              )
            })}
          </ol>

        </div>
      </div>
    )
  }
}

export default BookSearch;
