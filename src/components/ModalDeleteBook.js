import React, { Fragment, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteBookActionCreator } from '../redux/actions/book';

const ModalDeleteBook = (props) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');

    const dispatchDeleteBook = async () => {
        const { deleteBookAction } = props;
        await deleteBookAction(props.data.id, token);
        setShow(false);
        props.history.push('/');
    };

    return (
        <Fragment>
            <div onClick={() => setShow(true)} className='delete'>
                Delete
            </div>

            <Modal animation={false} transition={null} show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false} size='sm'>
                <Modal.Body>
                    <Form>
                        <p>Are you sure want to delete this data?</p>
                        <Button
                            variant='primary'
                            type='button'
                            onClick={dispatchDeleteBook}
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
        deleteBookAction: (id, token) => {
            dispatch(deleteBookActionCreator(id, token));
        },
    };
};

export default connect(null, mapDispatchToProps)(ModalDeleteBook);
