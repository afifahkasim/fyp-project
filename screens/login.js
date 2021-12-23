import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import RegisterButton from "../shared/buttonRegister";
import SubtitleButton from "../shared/buttonSubtitle";
import 'firebase/compat/firestore';
import { AuthContext } from "../routes/authProvider";
import { Formik } from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
  email: yup.string().required().min(4),
  password: yup.string().required().min(8),
  password: yup.string().required().min(4)

});

export default function Login({ navigation }) {
  console.log('[login.js] Login page loaded.');
  const { Login } = useContext(AuthContext)

  const pressRegister = () => {
    navigation.navigate('Register')
  }

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={image} style={globalStyles.image}>
        <View style={globalStyles.containerLogin}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              // actions contain some methods to call on form
              actions.resetForm();
              Login(values.email, values.password);
            }}>
            {/* Formik provides these props automatically (any name accepted) */}
            {(formikProps) => (
              <View>
                <Text style={globalStyles.textRegister}>Login</Text>

                <TextInput
                  placeholder='Siswamail / Personal Mail'
                  placeholderTextColor='lightgrey'
                  style={globalStyles.inputLogin}
                  // this handles/changes the state behind the scenes for us
                  onChangeText={formikProps.handleChange('email')}
                  // this
                  value={formikProps.values.email}
                  onBlur={formikProps.handleBlur('email')} />

                <TextInput
                  placeholder='Password'
                  placeholderTextColor='lightgrey'
                  style={globalStyles.inputLogin}
                  secureTextEntry={true}
                  onChangeText={formikProps.handleChange('password')}
                  value={formikProps.values.password}
                  onBlur={formikProps.handleBlur('password')} />

                <RegisterButton text='Login' onPress={formikProps.handleSubmit} />

                <SubtitleButton text1='New Here?' text2='Register' onPress={pressRegister} />
              </View>
            )}
          </Formik>

          {/* <Text style={globalStyles.textSubtitle}>E-mail: {email}</Text> */}
        </View>

      </ImageBackground>

    </View>

  )
}

const image = require("../assets/registerPage/backgroundLogin.png");
const logo = require("../assets/welcomePage/logo.png");