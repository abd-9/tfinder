import * as Yup from 'yup';

export const SignupTutorSchema = Yup.object().shape({
  name: Yup.string().required('User Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});
