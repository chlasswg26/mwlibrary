import React, { Fragment, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NavbarLayout from '../components/NavbarLayout';
import { connect } from 'react-redux';
import { logoutActionCreator } from '../redux/actions/logout';
import { getAuthorActionCreator } from '../redux/actions/author';
import { getGenreActionCreator } from '../redux/actions/genre';

import ModalAddGenre from '../components/ModalAddGenre';
import ModalEditGenre from '../components/ModalEditGenre';

const Manage = (props) => {
    const token = localStorage.getItem('token');
    const role = atob(localStorage.getItem('role'));

    useEffect(() => {
        const { author, genre } = props;
        if (role === '1') {
            return (
                <Redirect to='/' />
            );
        }
        if (!author.isFulfilled) {
            props.getAuthorAction(token);
        }
        if (!genre.isFulfilled) {
            props.getGenreAction(token);
        }
    }, []);

    const dispatchLogout = async () => {
        localStorage.clear();
        const { logoutAction } = props;
        await logoutAction();
        props.history.push('/auth/signin');
    };

    return (
        <Fragment>
            <NavbarLayout
                toWhere={dispatchLogout}
                search={null}
                toHome={() => <Redirect to='/' />}
                toManage={() => props.history.push('/manage')}
                toHistory={() => props.history.push('/history')}
                toMyBook={() => props.history.push('/book')}
            />

            <Container style={{ marginTop: '20px' }}>
                <Row>
                    <Col lg={{ span: 4, offset: 2 }}>
                        <Table responsive='xl'>
                            <thead>
                                <tr>
                                    <th colSpan='2' style={{ textAlign: 'center' }}>
                                        Author's
                                    </th>
                                    <th>
                                        {/* <ModalAddAuthor key={author} /> */}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.author.response.map((author, key) => (
                                    <tr key={key}>
                                        <td>{author.name}</td>
                                        <td>
                                            {/* <ModalEditAuthor
                                                id={author.id}
                                                author={author.author}
                                            /> */}
                                        </td>
                                        <td>
                                            {/* <ModalDeleteAuthor id={author.id} /> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col lg={4}>
                        <Table responsive='xl'>
                            <thead>
                                    <tr>
                                        <th colSpan='2' style={{ textAlign: 'center' }}>
                                            Genre's
                                    </th>
                                    <th>
                                        <ModalAddGenre />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.genre.response.map((genre, key) => (
                                    <tr key={key}>
                                        <td>{genre.name}</td>
                                        <td>
                                            <ModalEditGenre id={genre.id} genre={genre.name} />
                                        </td>
                                        <td>
                                            {/* <ModalDeleteGenre id={genre.id} /> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

const mapStateToProps = ({ author, genre }) => {
    return {
        author,
        genre,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => {
            dispatch(logoutActionCreator());
        },
        getAuthorAction: (token) => {
            dispatch(getAuthorActionCreator(token));
        },
        getGenreAction: (token) => {
            dispatch(getGenreActionCreator(token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
