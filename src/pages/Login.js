import React, { Fragment, useState, useEffect, useRef } from 'react';
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
import { loginActionCreator } from '../redux/actions/login';
import { yupResolver } from '@hookform/resolvers';
import { SignInSchema } from '../utils/Schema';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mounted = useRef();
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(SignInSchema), });

    useEffect(() => {
        const { history } = props;
        const { isFulfilled } = props.login;
        if (!mounted.current) {
            mounted.current = true;
        } else {
            localStorage.setItem('lastPage', '/');
            if (isFulfilled) {
                history.push('/auth/token');
            }
        }
    }, [props]);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const dispatchLogin = () => {
        localStorage.clear();
        const { loginAction } = props;
        loginAction(qs.stringify({
            email,
            password,
        }));
    };

    const {
        isRejected,
        isLoading,
        errorMessage
    } = props.login;

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
                        <h1>Login</h1>
                        <p style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>Welcome Back, Please Login to your account</p>
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

                        <Form onSubmit={handleSubmit(dispatchLogin)}>
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
                                ) : 'Login' }
                            </Button>
                            
                            <Button
                                variant='light'
                                type='button'
                                onClick={() => {
                                    props.history.push('/auth/signup')
                                }}
                            >
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

const mapStateToProps = ({ login }) => {
    return {
        login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (data) => {
            dispatch(loginActionCreator(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
