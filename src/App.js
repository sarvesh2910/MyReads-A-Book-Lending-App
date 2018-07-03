import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from 'react-router-dom'
import BookShelf from './Containers/BookShelf'
import Search from './components/Search'
import Notifications, {notify} from 'react-notify-toast';


export default class BooksApp extends Component {
    state = {
        books: [],
        error: false
    };

    //This method is invoked immediately after components are mounted. It will fetch all the initial books from API
    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                console.log(books);
                this.setState({books: books})
            })
            .catch(e => {
                console.log(e);
                this.setState({error: true})
            })
    }


    //Used for changing shelf of the book
    changeShelf = (book, shelf) => {
        let bookToChange = book;
        BooksAPI
            .update(bookToChange, shelf)
            .then(() => {
                shelf === 'none' ? notify.show("Removed from Shelf!", "warning", 2300) : notify.show("Success!", "success", 2300);
                bookToChange.shelf = shelf;

                //NewBooks contain all the book except the book selected
                let NewBooks = this.state.books.filter(book => book.id !== bookToChange.id)
                NewBooks.push(bookToChange);

                //updating the state
                this.setState({
                    books: NewBooks
                })
            })
    };

    render() {
        return (
            <div className="app">
                <Notifications options={{top: '70px'}}/> {/*3rd party notifications module*/}
                <Route path="/" exact render={() => (
                    <div>
                        {this.state.error ? (
                            <div className='info'>
                                Error occurred. Please Refresh the page
                            </div>

                        ) : (
                            this.state.books.length === 0 ? (
                                <div className='info'>
                                    "Fetching books..."
                                </div>
                            ) : (
                                <BookShelf books={this.state.books} changeShelf={this.changeShelf}/>
                            )
                        )}

                        <div className="open-search">
                            <Link to="/search">Add a book </Link>
                        </div>
                    </div>
                )}/>
                <Route path='/search' render={() => (
                    <Search addedBooks={this.state.books} changeShelf={this.changeShelf}/>
                )}/>
            </div>
        )
    }
}
