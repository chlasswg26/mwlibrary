import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    name: Yup.string().required().max(50),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
    repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'repeat password not match with password'),
});

export const VerifyCodeSchema = Yup.object().shape({
    verifyCode: Yup.string().required().min(6).max(6),
});

export const SignInSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
});

export const AddBookSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    author: Yup.string().required(),
    genre: Yup.string().required(),
});

export const AddAuthorSchema = Yup.object().shape({
    name: Yup.string().required().max(50),
});

export const AddGenreSchema = Yup.object().shape({
    name: Yup.string().required().max(50),
});
