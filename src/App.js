import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import { BookShelf, SearchPage } from './Components';

class BooksApp extends React.Component {
  state = {
    books : [],
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    return BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    });
  }

  handleBookUpdate = (book, newShelf) => {
    return BooksAPI.update(book, newShelf).then(() => {
      return this.getBooks();
    });
  }

  render() {
    console.log(BooksAPI);
    const {books} = this.state;
    return (
      <div className="app">

        <Route exact path="/search" render={() => (<SearchPage onShelfChange={this.handleBookUpdate}/>)} />

        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <BookShelf books={books} title="currentlyReading" onShelfChange={this.handleBookUpdate}/>
                  <BookShelf books={books} title="wantToRead" onShelfChange={this.handleBookUpdate}/>
                  <BookShelf books={books} title="read" onShelfChange={this.handleBookUpdate}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
