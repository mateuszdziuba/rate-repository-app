import { StyleSheet, TextInput, View } from 'react-native'
import { useField } from 'formik'

import Text from '../Text'
import theme from '../../theme'

const styles = StyleSheet.create({
    errorText: {
        color: '#d73a4a',
        marginTop: 3,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.textSecondary,
        borderRadius: 5,
    },
    inputWrapper: {
        marginBottom: 10,
    },
})

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    const showError = meta.touched && meta.error

    return (
        <View style={styles.inputWrapper}>
            <TextInput
                onChangeText={(value) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
                style={styles.input}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </View>
    )
}

export default FormikTextInput
