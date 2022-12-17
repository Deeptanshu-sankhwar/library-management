import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Form from 'react-bootstrap/Form';

function Books() {

    const [books, setBooks] = useState([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState(0);
    const [rating, setRating] = useState(0);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState();

    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        axios.get('/api/book/')
            .then(function (response) {
                setBooks(response.data.data)
            })
            .catch(function (error) {
                alert(error.data.message)
                console.log(error);
            })
    }, [])

    const onDeleteBook = (_id) => {
        axios.post(`/api/book/delete/${_id}`, {
            token: token
        })
            .then(function (response) {
                alert(response.data.message)
                window.location.reload();
            })
            .catch(function (error) {
                alert(error.response.data.message)
                console.log(error);
            })
    }

    const onEditBook = (_id, price) => {
        console.log(_id)
        setShowEditModal(_id);
        
    }

    const submitEditBook = (_id, price) => {
        axios.put(`/api/book/edit`, {
            token: token,
            _id: _id,
            price: price
        })
            .then(function (response) {
                alert(response.data.message)
                window.location.reload();
            })
            .catch(function (error) {
                alert(error.response.data.message)
                console.log(error);
            })
    }

    const onAddBook = () => {
        setShowAddModal(true);
    }

    const submitAddBook = () => {
        axios.post(`/api/book/create`, {
            token: token,
            name: name,
            price: price,
            author: author,
            isbn: isbn,
            rating: rating
        })
            .then(function (response) {
                alert(response.data.message)
                window.location.reload();
            })
            .catch(function (error) {
                alert(error.response.data.message)
                console.log(error);
            })
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        window.location = "/login"
    }

    const onSort = () => {
        axios.get('/api/book/sort')
            .then(function (response) {
                setBooks(response.data.data)
            })
            .catch(function (error) {
                alert(error.data.message)
                console.log(error);
            })
    }

    console.log('books', books)

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: "12px" }}>
                <h1>Books</h1>
                <button onClick={onAddBook}>Add Book</button>
                <button onClick={onSort}>Sort By Price</button>
                <button onClick={onLogout}>Logout</button>
            </div>
            {
                showAddModal &&
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Book</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" value={name} name={'name'} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" value={price} name={'price'} onChange={(e) => setPrice(e.target.value)} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="name" value={author} name={'author'} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control type="number" value={isbn} name={'isbn'} onChange={(e) => setIsbn(e.target.value)} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control type="number" value={rating} name={'rating'} onChange={(e) => setRating(e.target.value)} placeholder="Enter email" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="primary" onClick={submitAddBook}>Add</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            }

            {
                showEditModal &&
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit Book Price</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" value={price} name={'price'} onChange={(e) => setPrice(e.target.value)} placeholder="Author" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="primary" onClick={() => submitEditBook(showEditModal, price)}>Edit</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            }
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Published Date</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                {
                    books && books.map((book, index) => {
                        return (
                            <tr key={ book._id }>
                                <td>{ index + 1 }</td>
                                <td>{ book.name }</td>
                                <td>{ book.price }</td>
                                <td>{ book.author }</td>
                                <td>{ book.isbn }</td>
                                <td>{ book.published_date }</td>
                                <td>{ book.rating }</td>
                                <td><button onClick={() => onEditBook(book._id, book.price)}>Edit Price</button></td>
                                <td><button onClick={() => onDeleteBook(book._id)}>Delete</button></td>
                            </tr>
                        )
                    })   
                }
            </tbody>
            </Table>
        </div>
    );
}

export default Books;