import React, {
    Fragment,
    useEffect,
    useRef,
} from 'react';
import qs from 'querystring';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { tokenActionCreator } from '../redux/actions/login';

const Token = (props) => {
    const mounted = useRef();
    const { tokenAction, login } = props;
    const { isFulfilled, token, response } = login;

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (isFulfilled) {
                const { id, role, name, email } = response;
                localStorage.setItem('token', token);
                localStorage.setItem('id', id);
                localStorage.setItem('role', btoa(role));
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                props.history.push('/history');
            }
        }
    }, [props, isFulfilled, response, token]);

    useEffect(() => {
        const { token, refreshToken } = response;
        tokenAction(qs.stringify({ token: refreshToken }), token);
    }, [response, tokenAction]);

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