import React, { Fragment, useState, useEffect, useRef } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Image,
    Form,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NavbarLayout from '../components/NavbarLayout';
import CarouselLayout from '../components/CarouselLayout';
import PaginationLayout from '../components/PaginationLayout';
import { connect } from 'react-redux';
import { 
    getBookActionCreator,
    getBookByFilterActionCreator,
 } from '../redux/actions/book';
import { logoutActionCreator } from '../redux/actions/logout';
import ModalAddBook from '../components/ModalAddBook';

const Home = (props) => {
    const [megaState, setMegaState] = useState({
        page: '',
        limit: '',
        by: '',
        sort: '',
        search: ''
    });
    
    const mounted = useRef();

    const usePreviousValue = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };
    const prevValue = usePreviousValue(megaState);
    const token = localStorage.getItem('token');
    const role = atob(localStorage.getItem('role'));

    useEffect(() => {
        if (!mounted.current) {
            props.getBookAction();
            props.getBookByFilterAction(token, prevValue);

            mounted.current = true;
        } else {
            if (prevValue !== megaState) {
                props.getBookByFilterAction(token, megaState);
                const { page, limit, by, sort, search } = megaState;
                let query = '?';
                if (search) {
                    query += `search=${search}&`;
                }
                if (by) {
                    query += `by=${by}&`;
                }
                if (sort) {
                    query += `sort=${sort}&`;
                }
                if (page) {
                    query += `page=${page}&`;
                }
                if (limit) {
                    query += `limit=${limit}`;
                }
                props.history.push(query);
            }
        }
    }, [props, megaState, prevValue, token, role]);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'limit':
                setMegaState({
                    page: prevValue.page,
                    limit: value,
                    by: prevValue.by,
                    sort: prevValue.sort,
                    search: prevValue.search
                });
                break;
            case 'by':
                setMegaState({
                    page: prevValue.page,
                    limit: prevValue.limit,
                    by: value,
                    sort: prevValue.sort,
                    search: prevValue.search
                });
                break;
            case 'sort':
                setMegaState({
                    page: prevValue.page,
                    limit: prevValue.limit,
                    by: prevValue.by,
                    sort: value,
                    search: prevValue.search
                });
                break;
            case 'search':
                setMegaState({
                    page: prevValue.page,
                    limit: prevValue.limit,
                    by: prevValue.by,
                    sort: prevValue.sort,
                    search: value
                });
                break;
            default:
                break;
        };
    };

    const handlePage = (event) => {
        setMegaState({
            page: event.target.id,
            limit: prevValue.limit,
            by: prevValue.by,
            sort: prevValue.sort,
            search: prevValue.search
        });
    };

    const dispatchLogout = async () => {
        localStorage.clear();
        const { logoutAction } = props;
        await logoutAction();
        props.history.push('/auth/signin');
    };

    const { responseBook, responseBookByFilter, pagination } = props.book;

    return (
        <Fragment>
            <NavbarLayout
                toWhere={dispatchLogout}
                search={handleChange}
                toHome={() => <Redirect to='/' />}
                toManage={() => props.history.push('/manage')}
                toHistory={() => props.history.push('/history')}
                toMyBook={() => props.history.push('/book')}
            />
            <CarouselLayout
                responseBook={responseBook}
                isLoading={props.book.isLoading}
                history={props.history}
            />
            <Container>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control as='select' size='sm' name='by' onChange={handleChange}>
                                <option value=''>Sort By</option>
                                <option value=''>New release</option>
                                <option value='title'>Title</option>
                                <option value='author'>Author</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control as='select' size='sm' name='sort' onChange={handleChange}>
                                <option value='DESC'>Z-A</option>
                                <option value='ASC'>A-Z</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control as='select' size='sm' name='limit' onChange={handleChange}>
                                <option value=''>Set Limit</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xl={{ offset: 5 }}>
                        {role === '2' && <ModalAddBook />}
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        <hr />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {responseBookByFilter.map((data, key) => (
                            <Col
                                lg={2}
                                xs={6}
                                key={key}
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => props.history.push(`/description/${data.id}`)}
                            >
                                <Image
                                    src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                                    style={{ height: '200px' }}
                                    rounded
                                />
                                <Card style={{ border: 'none' }}>
                                    <Card.Body style={{ padding: '4px' }}>
                                        <Card.Text style={{ margin: '1px' }}>
                                            {data.title}
                                        </Card.Text>
                                        <Card.Text style={{ margin: '1px' }}>
                                            <small className='text-muted'>{data.author}</small>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                <Col key='pagination' style={{
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                }}>
                    <PaginationLayout handlePage={handlePage} pagination={pagination} />
                </Col>
            </Container>
        </Fragment>
    );
};

const mapStateToProps = ({ book, author, genre }) => {
    return {
        book,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookAction: () => {
            dispatch(getBookActionCreator());
        },
        getBookByFilterAction: (token, data) => {
            dispatch(getBookByFilterActionCreator(token, data));
        },
        logoutAction: () => {
            dispatch(logoutActionCreator());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
