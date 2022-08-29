import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from '../FormikTextInput'
import * as yup from 'yup'
import useSignUp from '../../hooks/useSignUp'
import { useNavigate } from 'react-router-native'
import Button from '../Common/Button'

const initialValues = {
    username: '',
    password: '',
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username must have at least 1 character')
        .max(30, `Username can't have more than 30 chars`)
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must have at least 5 characters')
        .max(50, `Password can't have more than 50 chars`)
        .required('Password is required'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')])
        .required('Password confirmation is required'),
})

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
})

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput placeholder="Username" name="username" />
            <FormikTextInput
                placeholder="Password"
                name="password"
                secureTextEntry={true}
            />
            <FormikTextInput
                placeholder="Password confirmation"
                name="passwordConfirm"
                secureTextEntry={true}
            />
            <Button onPress={onSubmit} label="Sign up" />
        </View>
    )
}

export const SignUpContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

const SignUp = () => {
    const [signUp] = useSignUp()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { username, password} = values

        try {
            await signUp({ username, password })
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
    return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
