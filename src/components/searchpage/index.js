import React from 'react'
import * as BooksAPI from '../../BooksAPI'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Book } from '../book'


class SearchPage extends React.Component {

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        result: []
    }

    // componentDidUpdate(){
    //     let {result, query} = this.state;

    //     if(query === ' '){
    //         return result;
    //     }
    //     BooksAPI.search(query).then((data) => {
    //         return this.setState({ result: data })
    //     });
    // }

    handleChange = (e) => {
        let {result, query} = this.state;
        this.setState({
            query: e.target.value
        });

        if(query === ' '  || query.length <= 3 ){
            return result;
        }
        BooksAPI.search(query).then((data) => {
            return this.setState({ result: data })
        });
    }

    render() {
        let {result, query} = this.state;
        result = (Array.isArray(result))? result: [];
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.handleChange}
                        value={query} 
                        placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {result.map(book => <Book data={book} key={book.id} 
                        onBookShelfChange={this.props.onShelfChange} />)}
                    </ol>
                </div>
            </div>
        )
    }
    
}

export {SearchPage}