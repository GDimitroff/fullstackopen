/* eslint-disable react-native/no-inline-styles */
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  review: yup.string(),
})

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  inputs: {
    marginBottom: 15,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 2,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
})

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
}

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: formik.touched.owner && formik.errors.owner ? '#d73a4a' : '#ccc',
            }}
            placeholder='Repository owner name'
            value={formik.values.owner}
            onChangeText={formik.handleChange('owner')}
          />
          {formik.touched.owner && formik.errors.owner && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.owner}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: formik.touched.name && formik.errors.name ? '#d73a4a' : '#ccc',
            }}
            placeholder='Repository name'
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            secureTextEntry={true}
          />
          {formik.touched.name && formik.errors.name && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.name}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: formik.touched.rating && formik.errors.rating ? '#d73a4a' : '#ccc',
            }}
            placeholder='Rating between 0 and 100'
            value={formik.values.rating}
            onChangeText={formik.handleChange('rating')}
            keyboardType='numeric'
          />
          {formik.touched.rating && formik.errors.rating && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.rating}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: formik.touched.review && formik.errors.review ? '#d73a4a' : '#ccc',
            }}
            placeholder='Review'
            value={formik.values.review}
            onChangeText={formik.handleChange('review')}
          />
          {formik.touched.review && formik.errors.review && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.review}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={styles.submitButton}
        disabled={!formik.isValid}
      >
        <Text style={styles.submitButtonText}>Create a review</Text>
      </TouchableOpacity>
    </View>
  )
}

const ReviewForm = () => {
  async function onSubmit(values) {
    console.log(values)
  }

  return <ReviewFormContainer onSubmit={onSubmit} />
}

export default ReviewForm
