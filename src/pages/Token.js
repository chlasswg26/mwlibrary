import React, {
    Fragment,
    useEffect,
    useRef,
} from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { tokenActionCreator } from '../redux/actions/login';

const Token = (props) => {
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            const dispatchToken = async () => {
                const { token, refreshToken } = props.login.response;
                await props.tokenAction(qs.stringify({ token: refreshToken }), token);
            };
            dispatchToken();
            mounted.current = true;
        } else {
            if (props.login.isFulfilled) {
                const { id, role, name, email } = props.login.response;
                localStorage.setItem('token', props.login.token);
                localStorage.setItem('id', id);
                localStorage.setItem('role', btoa(role));
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                props.history.push(localStorage.getItem('lastPage'));
            }
        }
    }, [props]);

    if (localStorage.getItem('token')) {
      return (
        <Redirect to='/' />
      );
    } else if (!localStorage.getItem('lastPage')) {
       return (
        <Redirect to='/' />
       );
    }

    return (
        <Fragment>
            <Spinner animation='grow' variant='info' />
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
        tokenAction: (body, token) => {
            dispatch(tokenActionCreator(body, token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Token);