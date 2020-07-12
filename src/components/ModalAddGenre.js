import React, { Fragment, useState } from 'react';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postGenreActionCreator } from '../redux/actions/genre';
import { yupResolver } from '@hookform/resolvers';
import { AddGenreSchema } from '../utils/Schema';

const ModalAddGenre = () => {
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
    } = useForm({ resolver: yupResolver(AddGenreSchema), });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        name === 'name' ? setName(value) : setName('');
    };

    const dispatchPostGenre = () => {
        setValidated(true);
        dispatch(postGenreActionCreator(qs.stringify({ name }), token));
        setShow(false);
    };
    
    return (
        <Fragment>
            <Button variant='primary' size='sm' onClick={setShow(true)}>
          Add
        </Button>

        <Modal show={show} onHide={setShow(false)} size='sm'>
          <Modal.Header closeButton>
            <Form onSubmit={handleSubmit(dispatchPostGenre)} validated={validated} noValidate>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Genre name'
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

export default ModalAddGenre;
