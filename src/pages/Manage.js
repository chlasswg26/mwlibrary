import React, { Fragment, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap';
import NavbarLayout from '../components/NavbarLayout';
import { connect } from 'react-redux';
import { logoutActionCreator } from '../redux/actions/logout';
import { getAuthorActionCreator } from '../redux/actions/author';
import { getGenreActionCreator } from '../redux/actions/genre';

import ModalAddAuthor from '../components/ModalAddAuthor';
import ModalEditAuthor from '../components/ModalEditAuthor';
import ModalDeleteAuthor from '../components/ModalDeleteAuthor';

import ModalAddGenre from '../components/ModalAddGenre';
import ModalEditGenre from '../components/ModalEditGenre';
import ModalDeleteGenre from '../components/ModalDeleteGenre';

const Manage = (props) => {
    const token = localStorage.getItem('token');
    const role = atob(localStorage.getItem('role'));

    useEffect(() => {
        const { author, genre } = props;
        if (role === '1') {
            props.history.push('/');
        }
        if (!author.isFulfilled) {
            props.getAuthorAction(token);
        }
        if (!genre.isFulfilled) {
            props.getGenreAction(token);
        }

    // eslint-disable-next-line
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
                toHome={() => props.history.push('/')}
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
                                        <ModalAddAuthor />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.author.response.map((author, key) => (
                                    <tr key={key}>
                                        <td>{author.name}</td>
                                        <td>
                                            <ModalEditAuthor
                                                id={author.id}
                                                author={author.name}
                                            />
                                        </td>
                                        <td>
                                            <ModalDeleteAuthor id={author.id} />
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
                                            <ModalDeleteGenre id={genre.id} />
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
