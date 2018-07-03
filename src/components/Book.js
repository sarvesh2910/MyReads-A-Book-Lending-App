//a book component.

import React, {Component} from 'react'

// online service for placeholder generation
let placeholder = 'https://dummyimage.com/128X193/e3e3e3/000000.png&text=No+Thumbnail';

export default class Book extends Component {

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : placeholder})`
                    }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={(event) => this.props.changeShelf(this.props.book, event.target.value)}
                            defaultValue={this.props.book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                {this.props.book.authors && this.props.book.authors.map((author, index) =>
                    <div className="book-authors" key={index}>
                        {author}
                    </div>
                )}
            </div>
        )
    }
}