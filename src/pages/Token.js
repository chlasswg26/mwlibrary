import React from 'react';
import qs from 'querystring';
import { useSelector, useDispatch, } from 'react-redux';
import { tokenActionCreator } from '../redux/actions/login';

const Token = (props) => {
    const {
        isFulfilled,
        token,
        response
    } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const mounted = React.useRef();

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            const { history } = props;

            if (isFulfilled) {
                localStorage.setItem('token', token);
                localStorage.setItem('id', response.id);
                localStorage.setItem('role', btoa(response.role));
                localStorage.setItem('name', response.name);
                localStorage.setItem('email', response.email);
                history.push(localStorage.getItem('lastPage'));
            }
        }
    }, [props, isFulfilled, response, token]);

    React.useEffect(() => {
        const { token, refreshToken } = response;
        dispatch(tokenActionCreator(qs.stringify({ token: refreshToken }), token));
        localStorage.setItem('token', refreshToken);
    }, [dispatch, response]);

    return null;
};

export default Token;
