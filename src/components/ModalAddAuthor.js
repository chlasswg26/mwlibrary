import React, { Fragment, useState } from 'react';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postAuthorActionCreator } from '../redux/actions/author';
import { yupResolver } from '@hookform/resolvers';
import { AddAuthorSchema } from '../utils/Schema';

const ModalAddAuthor = () => {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const {
        token,
    } = useSelector((state) => state.login);
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
    };

    const dispatchPostAuthor = () => {
        setValidated(true);
        dispatch(postAuthorActionCreator(qs.stringify({ name }), token));
        setShow(false);
    };
    
    return (
        <Fragment>
            <Button variant='primary' size='sm' onClick={setShow(true)}>
          Add
        </Button>

        <Modal show={show} onHide={setShow(false)} size='sm'>
          <Modal.Header closeButton>
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
                Add
              </Button>
            </Form>
          </Modal.Header>
        </Modal>
        </Fragment>
    );
};

export default ModalAddAuthor;
