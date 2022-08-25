import { Pressable, StyleSheet } from 'react-native'
import theme from '../../theme'
import Text from '../Text'

const styles = StyleSheet.create({
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
})

const Button = (props) => (
    <Pressable style={styles.button} {...props}>
        <Text style={styles.buttonText}>{props.label}</Text>
    </Pressable>
)

export default Button
