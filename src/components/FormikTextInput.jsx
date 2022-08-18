import { StyleSheet, TextInput } from 'react-native'
import { useField } from 'formik'

import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    border: `1px solid ${theme.colors.textSecondary}`,
    marginBottom: 5,
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={styles.input}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
