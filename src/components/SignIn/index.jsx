import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from '../FormikTextInput'
import * as yup from 'yup'
import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import Button from '../Common/Button'

const initialValues = {
    username: '',
    password: '',
}

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
})

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
})

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput placeholder="Username" name="username" />
            <FormikTextInput
                placeholder="Password"
                name="password"
                secureTextEntry={true}
            />
            <Button onPress={onSubmit} label="Sign in" />
        </View>
    )
}

export const SignInContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

const SignIn = () => {
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        const { username, password } = values

        try {
            await signIn({ username, password })
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
    return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
