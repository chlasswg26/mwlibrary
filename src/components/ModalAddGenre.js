import React, { Fragment, useState } from 'react';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { postGenreActionCreator } from '../redux/actions/genre';
import { yupResolver } from '@hookform/resolvers';
import { AddGenreSchema } from '../utils/Schema';

const ModalAddGenre = (props) => {
    const [state, setState] = useState({
      name: '',
      show: false,
      validated: false,
    });
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(AddGenreSchema), });
    const token = localStorage.getItem('token');

    const handleChange = (event) => {
        event.preventDefault();
        setState({ name: event.target.value, show: true, });
    };

    const dispatchPostGenre = () => {
      const { postGenreAction } = props;
      const { name } = state;
      postGenreAction(qs.stringify({ name, }), token);
      setState({ validated: true, });
    };
    
    return (
        <Fragment>
            <Button variant='primary' size='sm' onClick={() => setState({ show: true, validated: false, })}>
          Add Genre
        </Button>

        <Modal animation={false} transition={null} show={state.show} onHide={() => setState({ show: false })} backdrop='static' keyboard={false} size='sm'>
          <Modal.Header closeButton />
          <Modal.Body>
            <Form onSubmit={handleSubmit(dispatchPostGenre)} validated={state.validated} noValidate>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Genre name'
                  ref={register}
                  onChange={handleChange}
                  isInvalid={errors.name}
                  required
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

const mapDispatchToProps = (dispatch) => {
  return {
    postGenreAction: (body, token) => {
      dispatch(postGenreActionCreator(body, token));
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalAddGenre);
