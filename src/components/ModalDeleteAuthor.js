import React, { Fragment, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAuthorActionCreator } from '../redux/actions/author';

const ModalDeleteAuthor = (props) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');

    const dispatchDeleteAuthor = async () => {
        const { id, deleteAuthorAction } = props;
        await deleteAuthorAction(id, token);
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
                            onClick={dispatchDeleteAuthor}
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
        deleteAuthorAction: (id, token) => {
            dispatch(deleteAuthorActionCreator(id, token));
        },
    };
};

export default connect(null, mapDispatchToProps)(ModalDeleteAuthor);
