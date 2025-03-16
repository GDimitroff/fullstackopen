import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
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
    onSubmit,
  })

  function onSubmit(values) {
    const email = parseFloat(values.email)
    const password = parseFloat(values.password)

    console.log(values)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='email'
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
      />
      <TextInput
        style={styles.input}
        placeholder='password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Login</Text>
      </Pressable>
    </View>
  )
}

export default SignIn
