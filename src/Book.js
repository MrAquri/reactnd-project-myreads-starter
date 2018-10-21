import React, { Component } from 'react'

class Book extends Component {

  state = {
    options: [
      {
        name: 'Move to...',
        value: 'move',
        disabled: true,
      },
      {
        name: 'Currently Reading',
        value: 'currentlyReading',
        disabled: false,
      },
      {
        name: 'Want to Read',
        value: 'wantToRead',
        disabled: false,
      },
      {
        name: 'Read',
        value: 'read',
        disabled: false,
      },
      {
        name: 'None',
        value: 'none',
        disabled: false,
      }
    ]
  }

  render() {

  //Fix the thumbnail bug, when a book doesn't have a provided thumbnail
  let checkURL =
    (this.props.book.imageLinks) ? this.props.book.imageLinks.thumbnail : '';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ checkURL })` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => this.props.changeShelf(this.props.book, event.target.value)}
              value={this.props.currentShelf}
            >
              {this.state.options.map(item => (
                <option key={item.value} value={item.value} disabled={item.disabled}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default Book;



/*
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
              */
