import React from 'react'
import { PropTypes } from 'prop-types'
import { Book } from '../book';


function BookShelf(props) {
        const {title, books, heading, onShelfChange} = props;
        const shelfBooks = books.filter((book) => book.shelf === title);
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

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
}

export { BookShelf }