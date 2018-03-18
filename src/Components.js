import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class BookShelf extends React.Component {
   
    render() {
        const {title, books} = this.props;
        // console.log(books);
        const shelfBooks = books.filter((book) => book.shelf == title);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                      {shelfBooks.map(book => <Book data={book} key={book.id} onBookShelfChange={this.props.onShelfChange}/>)}
                    </ol>
                </div>
            </div>
        )
    }
}

class Book extends React.Component {
    render() {
        const { data } = this.props;
        let styleObject = { width: 128, height: 193, backgroundImage: `url(${data.imageLinks.thumbnail})` };

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={styleObject}></div>
                    <ShelfChanger book={data} shelfChange={this.props.onBookShelfChange}/>
                </div>
                <div className="book-title">{data.title}</div>
                <div className="book-authors">{data.authors}</div>
            </div>
        );
    }
}

class ShelfChanger extends React.Component {
    state = {
        value: ' '
    }
    // set component state for book
    componentDidMount() {
        const {id} = this.props.book
        return BooksAPI.get(id).then((data) => (
            this.setState({
                value: data.shelf
            })
        ))
    }

    // Pass select value up to update parent book collection
    handleChange = (e) => {
        const {book,shelfChange} = this.props;
        const newShelf = e.target.value;
        return shelfChange(book, newShelf);
    }

    render() {
        return (
            <div className = "book-shelf-changer" >
                <select onChange={this.handleChange} value={this.state.value}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}


class SearchPage extends React.Component {

    state = {
        value: ' ',
        result: []
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })

        BooksAPI.search(this.state.value).then((data) =>{
           return this.setState({ result: data}) 
        })
    }
    render() {
        // console.log(BooksAPI);
        const {result} = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.handleChange} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {result.map(book => <Book data={book} key={book.id} onBookShelfChange={this.props.onShelfChange} />)}
                    </ol>
                </div>
            </div>
        )
    }
}

export { BookShelf, SearchPage }