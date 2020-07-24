import React, { Fragment, useState } from 'react';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { putAuthorActionCreator } from '../redux/actions/author';
import { yupResolver } from '@hookform/resolvers';
import { AddAuthorSchema } from '../utils/Schema';

const ModalEditAuthor = (props) => {
    const [name, setName] = useState(props.author);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const {
        response,
    } = useSelector((state) => state.author);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(AddAuthorSchema), });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        name === 'name' ? setName(value) : setName(response.name);
        setShow(true);
    };

    const dispatchPutAuthor = () => {
        const { id } = props;
        dispatch(putAuthorActionCreator(id, qs.stringify({ name }), token));
        setShow(false);
    };
    
    return (
        <Fragment>
            <Button variant='primary' size='sm' onClick={() => setShow(true)}>
          Edit
        </Button>

        <Modal animation={false} transition={null} show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false} size='sm'>
          <Modal.Header closeButton />
          <Modal.Body>
            <Form onSubmit={handleSubmit(dispatchPutAuthor)}>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Author name'
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
          </Modal.Body>
        </Modal>
        </Fragment>
    );
};

export default ModalEditAuthor;
