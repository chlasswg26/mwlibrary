import React, { Fragment, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteGenreActionCreator } from '../redux/actions/genre';

const ModalDeleteGenre = (props) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');

    const dispatchDeleteGenre = async () => {
        const { id, deleteGenreAction } = props;
        await deleteGenreAction(id, token);
        setShow(false);
    };

    return (
        <Fragment>
            <Button variant='danger' size='sm' onClick={() => setShow(true)}>
                Delete
            </Button>

            <Modal animation={false} transition={null} show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false} size='sm'>
                <Modal.Body>
                    <Form>
                        <p>Are you sure want to delete this data?</p>
                        <Button
                            variant='primary'
                            type='button'
                            onClick={dispatchDeleteGenre}
                            style={{ marginLeft: '130px' }}
                        >
                            Yes
                        </Button>
                        <Button
                            variant='secondary'
                            type='button'
                            onClick={() => setShow(false)}
                            style={{ marginLeft: '10px' }}
                        >
                            No
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteGenreAction: (id, token) => {
            dispatch(deleteGenreActionCreator(id, token));
        },
    };
};

export default connect(null, mapDispatchToProps)(ModalDeleteGenre);
