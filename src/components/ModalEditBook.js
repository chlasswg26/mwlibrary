import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { putBookActionCreator } from '../redux/actions/book';
import { getGenreActionCreator } from '../redux/actions/genre';
import { getAuthorActionCreator } from '../redux/actions/author';
import { yupResolver } from '@hookform/resolvers';
import { AddBookSchema } from '../utils/Schema';

const ModalEditBook = (props) => {
    const [megaState, setMegaState] = useState({
        image: null,
    });
    const [show, setShow] = useState(false);

    const {
        register,
        handleSubmit,
        errors,
    } = useForm({ resolver: yupResolver(AddBookSchema), });

    const token = localStorage.getItem('token');
    const role = atob(localStorage.getItem('role'));

    useEffect(() => {
        const { author, genre } = props;
        if (role === '1') {
            props.history.push('/');
        }
        if (!author.isFulfilled) {
            props.getAuthorAction(token);
        }
        if (!genre.isFulfilled) {
            props.getGenreAction(token);
        }

        // eslint-disable-next-line
    }, []);

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setMegaState({ ...megaState, title: value });
                break;
            case 'description':
                setMegaState({ ...megaState, description: value });
                break;
            case 'author':
                setMegaState({ ...megaState, author: value });
                break;
            case 'genre':
                setMegaState({ ...megaState, genre: value });
                break;
            default:
                const file = event.target.files[0];
                if (file) {
                    setMegaState({ ...megaState, image: file, imagePreview: URL.createObjectURL(file) });
                }
                break;
        };
        setShow(true);
    };

    const dispatchPostBook = async () => {
        const { putBookAction } = props;
        const updateData = new FormData();
        updateData.append('title', megaState.title || props.data.title);
        updateData.append('description', megaState.description || props.data.description);
        updateData.append('image', megaState.image);
        updateData.append('genre', megaState.genre || props.data.id_genre);
        updateData.append('author', megaState.author || props.data.id_author);
        await putBookAction(props.data.id, updateData, token);
        setShow(false);
        props.history.push('/');
    };

    return (
        <Fragment>
            <div onClick={() => setShow(true)} className='edit'>
                Edit
            </div>

            <Modal animation={false} transition={null} show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(dispatchPostBook)}>
                    <Modal.Body>
                        <Form.Group controlId='inputTitle'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                name='title'
                                placeholder='title'
                                defaultValue={props.data.title}
                                ref={register}
                                onChange={handleChange}
                                isInvalid={errors.title}
                            />
                            {errors.title && (
                                <Form.Control.Feedback type='invalid'>{errors.title.message}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group controlId='inputDescription'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='textarea'
                                name='description'
                                as='textarea'
                                placeholder='description'
                                defaultValue={props.data.description}
                                rows='3'
                                ref={register}
                                onChange={handleChange}
                                isInvalid={errors.description}
                            />
                            {errors.description && (
                                <Form.Control.Feedback type='invalid'>{errors.description.message}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group controlId='selectAuthor'>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                as='select'
                                name='author'
                                ref={register}
                                onChange={handleChange}
                                isInvalid={errors.author}
                                defaultValue={props.data.id_author}
                            >
                                <option value=''>--Choose Author--</option>
                                {props.author.response.map((author, key) => (
                                    <option key={key} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </Form.Control>
                            {errors.author && (
                                <Form.Control.Feedback type='invalid'>{errors.author.message}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group controlId='selectGenre'>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                as='select'
                                name='genre'
                                ref={register}
                                onChange={handleChange}
                                isInvalid={errors.genre}
                                defaultValue={props.data.id_genre}
                            >
                                <option value=''>--Choose Genre--</option>
                                {props.genre.response.map((genre, key) => (
                                    <option key={key} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </Form.Control>
                            {errors.genre && (
                                <Form.Control.Feedback type='invalid'>{errors.genre.message}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.File
                                type='file'
                                id='custom-file'
                                label={!megaState.image ? 'Choose the files' : megaState.image.name}
                                name='image'
                                ref={register}
                                onChange={handleChange}
                                isInvalid={errors.image}
                                custom
                                required
                            />
                            {(megaState.imagePreview || props.data.image) && (
                                <Fragment>
                                    <small>Preview Image: </small>
                                    <Image src={megaState.imagePreview || process.env.REACT_APP_API_URL + '/images/' + props.data.image} style={{ width: 450, height: 400, }} rounded />
                                </Fragment>
                            )}
                            {errors.image && (
                                <Form.Control.Feedback type='invalid'>{errors.image.message}</Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' type='submit'>
                            Submit
                        </Button>
                        <Button variant='primary' onClick={() => setShow(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment>
    );
};

const mapStateToProps = ({ author, genre }) => {
    return {
        author,
        genre,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAuthorAction: (token) => {
            dispatch(getAuthorActionCreator(token));
        },
        getGenreAction: (token) => {
            dispatch(getGenreActionCreator(token));
        },
        putBookAction: (id, body, token) => {
            dispatch(putBookActionCreator(id, body, token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditBook);
