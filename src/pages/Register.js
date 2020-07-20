import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';
import { useForm } from 'react-hook-form';
import {
    Row,
    Col,
    Form,
    Button,
    Container,
    Alert,
    Spinner,
    Image,
} from 'react-bootstrap';
import Background from '../images/mollie-sivaram-_1gBVgy8gIU-unsplash.png';
import '../styles/Login.css';
import { connect } from 'react-redux';
import { registerActionCreator } from '../redux/actions/register';
import { yupResolver } from '@hookform/resolvers';
import { SignUpSchema } from '../utils/Schema';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line
    const [repeatPassword, setRepeatPassword] = useState('');
    const mounted = useRef();
    const { history } = props;
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(SignUpSchema), });

    useEffect(() => {
        const { isFulfilled } = props.register;
        const { history } = props;
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (isFulfilled) {
                localStorage.setItem('currentEmail', email);
                history.push('/auth/verify');
            }
        }
    }, [props, email]);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'repeatPassword':
                setRepeatPassword(value);
                break;
            default:
                break;
        };
    };

    const dispatchRegister = () => {
        const { registerAction } = props;
        registerAction(qs.stringify({ name, email, password, role: '1' }));
    };

    const {
        isRejected,
        isLoading,
        errorMessage
    } = props.register;

    if (localStorage.getItem('token')) {
      return (
        <Redirect to='/' />
      );
    }

    return (
        <Fragment>
            <Container fluid style={{
                marginLeft: '-2%',
                paddingRight: '10%',
            }}>
                <Row>
                    <Col>
                        <Image
                            fluid
                            src={ Background }
                            style={{
                                height: '100vh',
                                width: '60vw',
                            }}
                        />
                    </Col>
                    <Col
                        xs={11}
                        lg={3}
                        style={{
                            marginTop: '7%'
                        }}
                    >
                        <h1>Register</h1>
                        <p style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>Welcome Back, Please Register to create account</p>
                        { (isRejected && !isLoading) && (
                            <Alert
                                variant='danger'
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                { errorMessage }
                            </Alert>
                        ) }

                        <Form onSubmit={handleSubmit(dispatchRegister)}>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    placeholder='Enter your full name'
                                    autoComplete='off'
                                    ref={register}
                                    onChange={handleChange}
                                    isInvalid={errors.name}
                                />
                                { errors.name &&
                                    <Form.Control.Feedback type='invalid'>{ errors.name.message }</Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='email'
                                    placeholder='Enter email address'
                                    autoComplete='off'
                                    ref={register}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
                                />
                                { errors.email &&
                                    <Form.Control.Feedback type='invalid'>{ errors.email.message }</Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    placeholder='Enter security password'
                                    autoComplete='off'
                                    ref={register}
                                    onChange={handleChange}
                                    isInvalid={errors.password}
                                />
                                { errors.password &&
                                    <Form.Control.Feedback type='invalid'>{ errors.password.message }</Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='repeatPassword'
                                    placeholder='Repeat same security password'
                                    autoComplete='off'
                                    ref={register}
                                    onChange={handleChange}
                                    isInvalid={errors.repeatPassword}
                                />
                                { errors.repeatPassword &&
                                    <Form.Control.Feedback type='invalid'>{ errors.repeatPassword.message }</Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Button
                                style={{
                                    marginRight: 10,
                                }}
                                variant='dark'
                                type='submit'
                            >
                                { (isLoading) ? (
                                    <Spinner
                                        as='span'
                                        animation='border'
                                        size='sm'
                                        role='status'
                                        aria-hidden='true'
                                    />
                                ) : 'Register' }
                            </Button>
                            
                            <Button
                                variant='light'
                                type='button'
                                onClick={() => {
                                    history.push('/auth/signin')
                                }}
                            >
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

const mapStateToProps = ({ register }) => {
    return {
        register,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerAction: (data) => {
            dispatch(registerActionCreator(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
