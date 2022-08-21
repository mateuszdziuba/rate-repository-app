import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput placeholder="Username" name="username" />
      <FormikTextInput
        placeholder="Password"
        name="password"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    console.log(`username: ${username}, password: ${password}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
