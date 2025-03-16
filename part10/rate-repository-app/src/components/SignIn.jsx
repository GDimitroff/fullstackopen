import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, 'Email must be at least 3 characters long')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .required('Password is required'),
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
  email: '',
  password: '',
}

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  function onSubmit(values) {
    const email = parseFloat(values.email)
    const password = parseFloat(values.password)

    console.log(values)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: formik.touched.email && formik.errors.email ? '#d73a4a' : '#ccc',
            }}
            placeholder='Email'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={{ color: '#d73a4a', marginTop: 3 }}>{formik.errors.email}</Text>
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
      </View>

      <TouchableOpacity
        onPress={formik.handleSubmit}
        style={styles.submitButton}
        disabled={!formik.isValid}
      >
        <Text style={styles.submitButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn
