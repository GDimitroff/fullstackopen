/* eslint-disable react-native/no-inline-styles */
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 4 characters long')
    .max(50, 'Password must be at most 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')])
    .required('Password confirmation is required'),
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
  username: '',
  password: '',
  passwordConfirmation: '',
}

export const SignUpContainer = ({ onSubmit }) => {
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
              borderColor: formik.touched.username && formik.errors.username ? '#d73a4a' : '#ccc',
            }}
            placeholder='Username'
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.username}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: formik.touched.password && formik.errors.password ? '#d73a4a' : '#ccc',
            }}
            placeholder='Password'
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            secureTextEntry={true}
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.password}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor:
                formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
                  ? '#d73a4a'
                  : '#ccc',
            }}
            placeholder='Password confirmation'
            value={formik.values.passwordConfirmation}
            onChangeText={formik.handleChange('passwordConfirmation')}
            secureTextEntry={true}
          />
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>
              {formik.errors.passwordConfirmation}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={styles.submitButton}
        disabled={!formik.isValid}
      >
        <Text style={styles.submitButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

const SignUp = () => {
  const navigate = useNavigate()

  async function onSubmit(values) {
    console.log(values)

    try {
      console.log('sign up...')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
