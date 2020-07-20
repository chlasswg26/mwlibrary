import React, { Fragment, useState } from 'react';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { putGenreActionCreator } from '../redux/actions/genre';
import { yupResolver } from '@hookform/resolvers';
import { AddGenreSchema } from '../utils/Schema';

const ModalEditGenre = (props) => {
    const [name, setName] = useState(props.genre);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const {
        response,
    } = useSelector((state) => state.genre);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(AddGenreSchema), });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        name === 'name' ? setName(value) : setName(response.name);
        setShow(true);
    };

    const dispatchPutGenre = () => {
        const { id } = props;
        dispatch(putGenreActionCreator(id, qs.stringify({ name }), token));
        setShow(false);
    };
    
    return (
        <Fragment>
            <Button variant='primary' size='sm' onClick={() => setShow(true)}>
          Edit
        </Button>

        <Modal show={show} onHide={() => setShow(false)} size='sm'>
          <Modal.Header closeButton>
            <Form onSubmit={handleSubmit(dispatchPutGenre)}>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Genre name'
                  defaultValue={name}
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
          </Modal.Header>
        </Modal>
        </Fragment>
    );
};

export default ModalEditGenre;
