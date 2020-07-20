import React, {
    Fragment,
    useState,
    useEffect,
} from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Table,
    Image,
    Button,
    Modal,
} from 'react-bootstrap';
import NavbarLayout from '../components/NavbarLayout';
import qs from 'querystring';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
// import 'moment/locale/id'; // optional locale language
import { connect } from 'react-redux';
import {
    getBookByUserIdActionCreator,
    putBookActionCreator,
} from '../redux/actions/book';
import { postHistoryActionCreator } from '../redux/actions/history';
import { logoutActionCreator } from '../redux/actions/logout';

const Book = (props) => {
    const {
      history,
      book,
      getBookByUserIdAction,
    } = props;
    
    const role = atob(localStorage.getItem('role'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        
        if (role === '1') {
            getBookByUserIdAction(id, token);
        }
    }, [getBookByUserIdAction, role]);

    const dispatchLogout = async () => {
        localStorage.clear();
        const { logoutAction } = props;
        await logoutAction();
        history.push('/auth/signin');
    };

    const dispatchReturnBook = async (id, user) => {
        const { putBookAction, postHistoryAction } = props;
        const token = localStorage.getItem('token');
        await putBookAction(id, qs.stringify({ status: '2', user: 0 }), token);
        await postHistoryAction(qs.stringify({
            book: id,
            user: user,
            status: '2'
        }), token);
        history.push('/history');
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!localStorage.getItem('token')) {
      return (
        <Redirect to='/' />
      );
    }

    return (
        <Fragment>
          <NavbarLayout
            toWhere={dispatchLogout}
            search={null}
            toHome={() => history.push('/')}
            toManage={() => history.push('/manage')}
            toHistory={() => history.push('/history')}
            toMyBook={() => history.push('/book')}
          />
          <Container style={{ marginTop: '20px' }}>
            <Row>
              <Col>
                <h1 style={{ textAlign: 'center' }}>My Books</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col lg={{ span: 10, offset: 1 }}>
                <Table responsive='xl'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Borrow Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    { (book.isLoading || !book.isFulfilled) ? (
                      <tr>
                        <td style={{ width: '200px' }}><Skeleton /></td>
                        <td style={{ width: '200px' }}><Skeleton width={101} height={150} /></td>
                        <td style={{ width: '200px' }}><Skeleton /></td>
                        <td style={{ width: '200px' }}><Skeleton /></td>
                      </tr>
                    )
                    :
                    book.responseBookByUserId.map((data, key) => (
                      <tr key={key}>
                        <td style={{ width: '200px' }}>{data.title}</td>
                        <td style={{ width: '200px' }}>
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                            rounded
                            style={{ width: '101px', height: '150px' }}
                          />
                        </td>
                        <td style={{ width: '150px' }}>
                          {moment(data.created).format('LLLL')}
                        </td>
                        <td style={{ width: '200px' }}>
                          <Button
                                variant='dark'
                                onClick={handleShow}
                            >
                                Return the book
                            </Button>
                        </td>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop='static'
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>Return Book?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            Are you sure want return the book of {data.title}
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                                Close
                            </Button>
                            <Button type='submit' variant='primary' onClick={() => {
                                handleClose();
                                dispatchReturnBook(data.id, data.id_user);
                            }}>
                                Continue
                            </Button>
                            </Modal.Footer>
                        </Modal>
                      </tr>
                    )) }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
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
    getBookByUserIdAction: (id, token) => {
      dispatch(getBookByUserIdActionCreator(id, token));
    },
    putBookAction: (id, body, token) => {
        dispatch(putBookActionCreator(id, body, token));
    },
    postHistoryAction: (body, token) => {
        dispatch(postHistoryActionCreator(body, token));
    },
    logoutAction: () => {
      dispatch(logoutActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
