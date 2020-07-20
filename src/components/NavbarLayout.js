import React, { Fragment } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Image,
} from 'react-bootstrap';
import Icon from '../images/bookshelf.png';

const NavbarLayout = (props) => {
    const name = localStorage.getItem('name');
    const role = atob(localStorage.getItem('role'));
    
    return (
        <Fragment>
            <Navbar
                style={{ backgroundColor: '#FFFFFF', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}
                variant='light'
                expand='xl'
                sticky='top'
            >
                <Navbar.Brand
                    onClick={props.toHome}
                    style={{ cursor: 'pointer' }}
                >
                    <Image
                        src={Icon}
                        style={{
                            width: '30px',
                            height: '30px',
                            marginLeft: '5px',
                            marginRight: '5px',
                        }}
                    />
                    { process.env.REACT_APP_SITE_NAME }
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' />
                <Navbar.Collapse className='justify-content-between'>
                    <Nav>
                        { props.search && (
                            <Form>
                                <FormControl
                                    type='text'
                                    name='search'
                                    placeholder='Search some books'
                                    onKeyUp={props.search}
                                    style={{ borderRadius: '20px' }}
                                />
                            </Form>
                        ) }
                    </Nav>

                    <Nav>
                        <Image
                            src={
                                name ?
                                `https://ui-avatars.com/api/?size=35&background=57A2FF&color=000&name=${name}`
                                :
                                `https://ui-avatars.com/api/?size=35&background=57A2FF&color=000&name=Guest`
                            }
                            roundedCircle={true}
                            style={{
                                width: '35px',
                                height: '35px',
                                marginRight: '5px',
                                marginTop: '3px',
                            }}
                        />
                        <Navbar.Text className='mr-auto' style={{ color: 'black' }}>
                            {!name ? 'Guest' : name}
                        </Navbar.Text>
                    </Nav>

                    <Nav>
                        {role === '2' && (
                            <Nav.Link onClick={props.toManage}>Manage</Nav.Link>
                        )}
                        {role === '1' && (
                            <Nav.Link onClick={props.toMyBook}>My Book</Nav.Link>
                        )}
                        {(role === '1' || role === '2') && (
                            <Nav.Link onClick={props.toHistory}>History</Nav.Link>
                        )}
                        <Nav.Link onClick={props.toWhere}>
                            { role === '1' || role === '2' ? 'Logout' : 'Login' }
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};

export default NavbarLayout;
