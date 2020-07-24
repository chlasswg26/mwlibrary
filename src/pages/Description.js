import React, { Fragment, useState, useEffect } from 'react';
import qs from 'querystring';
import { Image, Modal, Button } from 'react-bootstrap';
import { getBookByIdActionCreator, putBookActionCreator } from '../redux/actions/book';
import { connect } from 'react-redux';
import '../styles/Description.css';
import ArrowBack from '../images/Arrow.png';
import { postHistoryActionCreator } from '../redux/actions/history';
import ModalEditBook from '../components/ModalEditBook';
import ModalDeleteBook from '../components/ModalDeleteBook';

const Description = (props) => {
    const [borrow, setBorrow] = useState(false);
    const [returned, setReturned] = useState(false);
    const token = localStorage.getItem('token');
    const role = atob(localStorage.getItem('role'));
    const id = localStorage.getItem('id');

    useEffect(() => {
        const { getBookByIdAction } = props;
        getBookByIdAction(props.match.params.id, token);

    // eslint-disable-next-line
    }, []);

    const handleBorrow = async (id, user) => {
        const { putBookAction, postHistoryAction } = props;
        await putBookAction(id, qs.stringify({ status: '1', user: user }), token);
        await postHistoryAction(qs.stringify({
            book: id,
            user: user,
            status: '1'
        }), token);
        props.history.push('/book');
    };

    const handleReturn = async (id, user) => {
        const { putBookAction, postHistoryAction } = props;
        const token = localStorage.getItem('token');
        await putBookAction(id, qs.stringify({ status: '2', user: 0 }), token);
        await postHistoryAction(qs.stringify({
            book: id,
            user: user,
            status: '2'
        }), token);
        props.history.push('/history');
    };

    return (
        <Fragment>
            <div className='value'>
            <Image
              className='top-cover'
              src={`${process.env.REACT_APP_API_URL}/images/${props.book.responseBookById.image}`}
              fluid
            />
            <Image
              className='cover'
              src={`${process.env.REACT_APP_API_URL}/images/${props.book.responseBookById.image}`}
            />
            <Image
              className='back-button'
              src={ArrowBack}
              onClick={() => props.history.push('/')}
            />
            {role === '2' && (
              <ModalEditBook
                data={props.book.responseBookById}
                history={props.history}
              />
            )}
            {role === '2' && (
              <ModalDeleteBook
                data={props.book.responseBookById}
                history={props.history}
              />
            )}
            {props.book.responseBookById.status === '2' ? (
              <div className='status'>Available</div>
            ) : (
              <div className='status-red'>Unavailable</div>
            )}
            <div className='detail'>
              <div className='title'>{props.book.responseBookById.title}</div>
              <div className='author'>{props.book.responseBookById.author}</div>
              <div className='description'>{props.book.responseBookById.description}</div>
            </div>
            {(props.book.responseBookById.status === '1' && role === '1') && (
              <div className='badge-borrow-disabled'>
                Empty
              </div>
            )}
            {(props.book.responseBookById.status === '2' && role === '1') && (
              <div className='badge-borrow' onClick={() => setBorrow(true)}>
                Borrow
              </div>
            )}
            {(props.book.responseBookById.status === '1' &&
              props.book.responseBookById.id_user.toString() === id) && (
              <div className='badge-return' onClick={() => setReturned(true)}>
                Return
              </div>
            )}
                <Modal
                    animation={false}
                    transition={null}
                    show={borrow}
                    onHide={() => setBorrow(false)}
                    backdrop='static'
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Borrow Book?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure want to borrow the book of {props.book.responseBookById.title}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setBorrow(false)}>
                            Close
                            </Button>
                        <Button type='submit' variant='primary' onClick={() => {
                            setBorrow(false);
                            handleBorrow(props.book.responseBookById.id, id);
                        }}>
                            Continue
                            </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    animation={false}
                    transition={null}
                    show={returned}
                    onHide={() => setReturned(false)}
                    backdrop='static'
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Return Book?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure want to return the book of {props.book.responseBookById.title}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setReturned(false)}>
                            Close
                            </Button>
                        <Button type='submit' variant='primary' onClick={() => {
                            setReturned(false);
                            handleReturn(props.book.responseBookById.id, id);
                        }}>
                            Continue
                            </Button>
                    </Modal.Footer>
                </Modal>
          </div>
        </Fragment>
    );
};

const mapStateToProps = ({ book }) => {
    return {
        book,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookByIdAction: (id, token) => {
            dispatch(getBookByIdActionCreator(id, token));
        },
        putBookAction: (id, body, token) => {
            dispatch(putBookActionCreator(id, body, token));
        },
        postHistoryAction: (body, token) => {
            dispatch(postHistoryActionCreator(body, token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
