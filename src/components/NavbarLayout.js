import React, { Fragment } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Image,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Icon from '../images/bookshelf.png';

const NavbarLayout = (props) => {
    const {
        response,
    } = useSelector((state) => state.login);
    const { name, role, image } = response;
    const {
        history,
        home,
        search,
        manage,
        logout,
    } = props;

    return (
        <Fragment>
            <Navbar
                style={{ backgroundColor: '#BCB5A0' }}
                variant='light'
                expand='xl'
                sticky='top'
            >
                <Navbar.Brand onClick={home} style={{ cursor: 'pointer' }}>
                    { process.env.REACT_APP_SITE_NAME }
            <Image
                        src={Icon}
                        style={{
                            width: '30px',
                            height: '30px',
                            marginLeft: '5px',
                        }}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
                <Navbar.Collapse className='justify-content-between'>
                    <Nav>
                        {search === 'Not use' ? (
                            <Fragment></Fragment>
                        ) : (
                                <Form>
                                    <FormControl
                                        type='text'
                                        placeholder='Search'
                                        onKeyUp={search}
                                        style={{ borderRadius: '20px' }}
                                    />
                                </Form>
                            )}
                    </Nav>
                    <Nav>
                        <Image
                            src={
                                image
                                    ? `${process.env.REACT_APP_API_URL}/images/${image}`
                                    : `https://ui-avatars.com/api/?size=35&background=f4f4f4&color=000&name=guest`
                            }
                            roundedCircle
                            style={{
                                width: '35px',
                                height: '35px',
                                marginRight: '5px',
                                marginTop: '3px',
                            }}
                        />
                        <Navbar.Text className='mr-auto' style={{ color: 'black' }}>
                            {name ? `${name}` : 'Guest'}
                        </Navbar.Text>
                    </Nav>

                    <Nav>
                        {role === 1 ? (
                            <Nav.Link onClick={manage}>Manage</Nav.Link>
                        ) : (
                                <Fragment></Fragment>
                            )}
                        {role === 1 || role === 2 ? (
                            <Nav.Link onClick={history}>History</Nav.Link>
                        ) : (
                                <Fragment></Fragment>
                            )}
                        <Nav.Link onClick={logout}>
                            {role === 1 || role === 2 ? `Logout` : `Login`}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};

export default NavbarLayout;
