//container of multiple shelf

import React, {Component} from 'react'
import Shelf from '../components/Shelf';


export default class BookShelf extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Shelf
                        books={this.props.books.filter(book => book.shelf === 'currentlyReading')}
                        title='Currently Reading'
                        changeShelf={this.props.changeShelf}/>
                    <Shelf
                        books={this.props.books.filter(book => book.shelf === 'read')}
                        title='Read'
                        changeShelf={this.props.changeShelf}/>
                    <Shelf
                        books={this.props.books.filter(book => book.shelf === 'wantToRead')}
                        title='Want to Read'
                        changeShelf={this.props.changeShelf}/>
                </div>
            </div>
        )
    }
}

