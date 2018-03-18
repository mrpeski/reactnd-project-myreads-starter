import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'


class BookShelf extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        onShelfChange: PropTypes.func.isRequired,
    }
    render() {
        const {title, books, heading, onShelfChange} = this.props;
        const shelfBooks = books.filter((book) => book.shelf == title);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                      {shelfBooks.map(book => <Book data={book} key={book.id} onBookShelfChange={onShelfChange}/>)}
                    </ol>
                </div>
            </div>
        )
    }
}

class Book extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onBookShelfChange: PropTypes.func.isRequired,
    }
    render() {
        const { data, onBookShelfChange } = this.props;
        let styleObject = { width: 128, height: 193, backgroundImage: `url(${data.imageLinks.thumbnail})` };

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={styleObject}></div>
                    <ShelfChanger book={data} shelfChange={onBookShelfChange}/>
                </div>
                <div className="book-title">{data.title}</div>
                <div className="book-authors">{data.authors}</div>
            </div>
        );
    }
}

class ShelfChanger extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelfChange: PropTypes.func.isRequired,
    }
    
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

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
    }

    state = {
        value: ' ',
        result: [ ]
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
        let {result} = this.state;
        result = (result)? result: [];
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