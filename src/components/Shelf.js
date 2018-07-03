//an individual shelf

import React, {Component} from 'react'
import Book from './Book'

export default class Shelf extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                </div>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.length !== 0 ? (this.props.books.map(book =>
                                <li key={book.id}>
                                    <Book changeShelf={this.props.changeShelf} book={book}/>
                                </li>))
                            : (
                                'No book added.'
                            )
                        }

                    </ol>
                </div>
            </div>


        )
    }

}
Shelf