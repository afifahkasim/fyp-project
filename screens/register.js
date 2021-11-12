import React, { useState, useContext } from 'react';
import { Text, View, ImageBackground, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import RegisterButton from "../shared/buttonRegister";
import SubtitleButton from "../shared/buttonSubtitle";
import { Formik } from 'formik';
import * as yup from 'yup';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../routes/authProvider";


const reviewSchema = yup.object({
  name: yup.string().required().min(4),
  email: yup.string().required().min(4),
  password: yup.string().required().min(8)

});

export default function Register({ navigation }) {
  const { Register } = useContext(AuthContext)

  const pressRegister2 = () => {
    navigation.navigate('Verification')
  }

  const pressLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={image} style={globalStyles.image}>
        <View style={globalStyles.containerRegister}>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
              // actions contain some methods to call on form
              actions.resetForm();
              Register(values.name, values.email, values.password);
            }}
          >

            {(formikProps) => (

                  <View>
                    <Text style={globalStyles.textRegister}>Register</Text>

                    <TextInput
                      placeholder='Full Name'
                      placeholderTextColor='lightgrey'
                      style={globalStyles.inputRegister}
                      onChangeText={formikProps.handleChange('name')}
                      value={formikProps.values.name}
                      onBlur={formikProps.handleBlur('name')} />
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.name && formikProps.errors.name}
                    </Text>

                    <TextInput
                      placeholder='Siswamail / Personal Mail'
                      placeholderTextColor='lightgrey'
                      style={globalStyles.inputRegister}
                      onChangeText={formikProps.handleChange('email')}
                      value={formikProps.values.email}
                      onBlur={formikProps.handleBlur('email')} />
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.email && formikProps.errors.email}
                    </Text>

                    <TextInput
                      placeholder='Password'
                      placeholderTextColor='lightgrey'
                      style={globalStyles.inputRegister}
                      onChangeText={formikProps.handleChange('password')}
                      value={formikProps.values.password}
                      onBlur={formikProps.handleBlur('password')} />
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.password && formikProps.errors.password}
                    </Text>

                    <RegisterButton text='Register' onPress={formikProps.handleSubmit} />

                    <SubtitleButton text1='Already a Member?' text2='Login' onPress={pressLogin} />
                  </View>


            )}

          </Formik>

        </View>

      </ImageBackground>

    </View>

  )
}

const image = require("../assets/registerPage/background.png");
const logo = require("../assets/welcomePage/logo.png");