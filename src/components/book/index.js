import React from 'react'
import { PropTypes } from 'prop-types'
import { ShelfChanger } from '../shelfchanger'


class Book extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onBookShelfChange: PropTypes.func.isRequired,
    }
    render() {
        const { data, onBookShelfChange } = this.props;
        let styleObject = { width: 128, height: 193, 
            backgroundImage: `url(${data.imageLinks.thumbnail !== undefined ? data.imageLinks.thumbnail:''})` };

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

export {Book}