//search page component

import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book';
import './../App.css'


export default class Search extends Component {
    state = {
        query: '',
        Books: []
    };

    /*This functions sets the shelf on which each books belong. Default value is none.
    If it is added in myReads shelf, its value will be same as the shelf in which it is added */
    setCategory = (books) => {
        for (let book of books) {
            book.shelf = 'none'
        }
        for (let book of books) {
            for (let oldbook of this.props.addedBooks) {
                if (oldbook.id === book.id) {
                    book.shelf = oldbook.shelf
                }
            }
        }
        return books
    };

    /*Used for searching and storing the value of search result returned*/
    searchBooks = (event) => {
        let q = event.target.value;
        this.setState({
            query: q
        });
        BooksAPI.search(q).then(book => {
            if (book === undefined || (book.error)) {
                this.setState({
                    Books: []
                })
            }
            else {
                book = this.setCategory(book)
                this.setState({
                    Books: book
                })
            }
        })
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={this.state.query}
                               onChange={this.searchBooks}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.Books && this.state.Books.map(book =>
                            <li key={book.id}>
                                <Book changeShelf={this.props.changeShelf} book={book}/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }

}
