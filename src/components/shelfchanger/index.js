import React from 'react'
import * as BooksAPI from '../../BooksAPI'
import { PropTypes } from 'prop-types'

class ShelfChanger extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelfChange: PropTypes.func.isRequired,
    }
    
    state = {
        value: ''
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
            <div className="book-shelf-changer" >
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

export { ShelfChanger }