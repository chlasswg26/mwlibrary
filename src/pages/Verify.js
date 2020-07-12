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
import { useSelector, useDispatch } from 'react-redux';
import { verifyActionCreator } from '../redux/actions/verify';
import { yupResolver } from '@hookform/resolvers';
import { VerifyCodeSchema } from '../utils/Schema';

const Verify = (props) => {
    const [verifyCode, setVerifyCode] = useState('');
    const {
        isLoading,
        isRejected,
        isFulfilled,
        errorMessage,
    } = useSelector((state) => state.verify);
    const dispatch = useDispatch();
    const mounted = useRef();
    const { history } = props;
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(VerifyCodeSchema), });

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (isFulfilled) {
                history.push('/auth/signin');
            }
        }
    }, [history, isFulfilled]);

    const handleChange = (event) => {
        event.preventDefault();
        let { name, value } = event.target;
        name === 'verifyCode' ? setVerifyCode(value) : setVerifyCode('');
    };

    const dispatchVerify = () => {
        const email = localStorage.getItem('currentEmail');
        dispatch(verifyActionCreator(qs.stringify({ email, verify_code: verifyCode })));
    };

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
                        <h1>Verification</h1>
                        <p style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>Welcome Back, Please Verify your account</p>
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

                        <Form onSubmit={handleSubmit(dispatchVerify)}>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Verification Code</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='verifyCode'
                                    placeholder='Enter verification code'
                                    autoComplete='off'
                                    ref={register}
                                    onChange={handleChange}
                                    isInvalid={errors.verifyCode}
                                />
                                { errors.verifyCode &&
                                    <Form.Control.Feedback type='invalid'>{ errors.verifyCode.message }</Form.Control.Feedback>
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
                                ) : 'Submit' }
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Verify;
