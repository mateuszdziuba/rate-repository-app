import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from '../FormikTextInput'
import * as yup from 'yup'
import useCreateReview from '../../hooks/useCreateReview'
import Button from '../Common/Button'

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: undefined,
    text: '',
}

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().min(0).max(100).required('Rating is required'),
    text: yup.string(),
})

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
})

const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput
                placeholder="Repository owner name"
                name="ownerName"
            />
            <FormikTextInput
                placeholder="Repository name"
                name="repositoryName"
            />
            <FormikTextInput
                placeholder="Rating between 0 and 100"
                name="rating"
            />
            <FormikTextInput placeholder="Review" name="text" />
            <Button onPress={onSubmit} label="Create a review" />
        </View>
    )
}

export const ReviewContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

const Review = () => {
    const [createReview] = useCreateReview()

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values

        try {
            await createReview({
                ownerName,
                repositoryName,
                rating: parseInt(rating),
                text,
            })
        } catch (e) {
            console.log(e)
        }
    }
    return <ReviewContainer onSubmit={onSubmit} />
}

export default Review
