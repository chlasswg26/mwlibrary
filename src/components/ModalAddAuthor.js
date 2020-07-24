import React, { Fragment, useState } from 'react';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postAuthorActionCreator } from '../redux/actions/author';
import { yupResolver } from '@hookform/resolvers';
import { AddAuthorSchema } from '../utils/Schema';

const ModalAddAuthor = () => {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(AddAuthorSchema), });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        name === 'name' ? setName(value) : setName('');
        setShow(true);
    };

    const dispatchPostAuthor = () => {
        setValidated(true);
        dispatch(postAuthorActionCreator(qs.stringify({ name }), token));
        setShow(false);
    };
    
    return (
        <Fragment>
            <Button variant='primary' size='sm' onClick={() => setShow(true)}>
          Add Author
        </Button>

        <Modal animation={false} transition={null} show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false} size='sm'>
          <Modal.Header closeButton />
          <Modal.Body>
            <Form onSubmit={handleSubmit(dispatchPostAuthor)} validated={validated} noValidate>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Author name'
                  ref={register}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                    { errors.name &&
                        <Form.Control.Feedback type='invalid'>{ errors.name.message }</Form.Control.Feedback>
                    }
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                size='sm'
                style={{ marginLeft: '200px' }}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        </Fragment>
    );
};

export default ModalAddAuthor;
