import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, LogBox, Image, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import Card from '../../shared/card';
import { globalStyles } from '../../styles/global';
import CenterButton from "../../shared/buttonCenter";
import { Formik } from 'formik';
import * as yup from 'yup';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { AuthContext } from "../../routes/authProvider";
import { Ionicons } from '@expo/vector-icons';

if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }


LogBox.ignoreLogs(['Setting a timer for a long period of time'])
const db = firebase.firestore();
// const regex = "^(01)[0-46-9]*[0-9]{7,8}$" Ni phone number punya

// const updateSchema = yup.object({
//   name: yup.string().required(),
//   matricsid: yup.string().optional().matches(regex, "Please enter valid format 01xxxxxxxxx")

// });

const editProfile = ({ navigation }) => {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { profile } = useContext(AuthContext)
  const [transferred, setTransferred] = useState(0);

  let genderChoice = [{
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Male',
    value: 'Male',
  }
  ]

  let intakeChoice = [{
    label: '2020/2021',
    value: 'Session 2020/2021',
  },
  {
    label: '2019/2020',
    value: 'Session 2019/2020',
  },
  {
    label: '2018/2019',
    value: 'Session 2018/2019',
  },
  {
    label: '2017/2018',
    value: 'Session 2017/2018',
  },
  ]

  let semesterChoice = [{
    label: '1',
    value: 'Semester 1',
  },
  {
    label: '2',
    value: 'Semester 2',
  }
  ]

  let departmentChoice = [{
    label: 'Artificial Intelligence',
    value: 'Artificial Intelligence',
  },
  {
    label: 'Information Systems',
    value: 'Information Systems',
  },
  {
    label: 'Computer System and Network',
    value: 'Computer System & Network',
  },
  {
    label: 'Software Engineering',
    value: 'Software Engineering',
  },
  {
    label: 'Multimedia',
    value: 'Multimedia',
  },
  {
    label: 'Data Science',
    value: 'Data Science',
  },
  ]


  useEffect(() => {
    (async () => {
      // FIXME:
      if (profile.profilepic != null || profile.profilepic != '') {
        setImageUrl(profile.profilepic)
        setImage(profile.profilepic)
      }
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const updateProfile = async (values, action, imageUrl) => {
    db.collection("users").doc(profile.userid).update({
      name: values.name,
      matricsid: values.matricsid,
      gender: values.gender,
      session: values.session,
      semester: values.semester,
      department: values.department,
      profilepic: imageUrl
    }).then(() => {
      // FIXME: this is ugly
      const cleanup4 = db.collection("comments").where("userid", "==", profile.userid).onSnapshot(querySnapshot => {

        const commentdb = querySnapshot
          .docs.map((doc) => ({
            id: doc.id,
          }));
        for (let c of commentdb) {
          db.collection("comments").doc(c.id).update({
            users: {
              image: imageUrl,
              name: values.name
            }
          })
        }
      })
      Alert.alert("Congratulations!", "Profile successfully updated."),
        navigation.goBack()
    }).catch(err => {
      console.log(err)
      alert("Error occur. Please try again")
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Did it get here?")
    
    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri)
        .then(() => {
          console.log("success")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);

    var ref = firebase.storage().ref().child("images/" + imageName).put(blob);
    ref.on(`state_changed`, snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      )
    }, error => { console.log(error.message) },
      () => {
        ref.snapshot.ref.getDownloadURL().then((url) => {
          setImageUrl(url)
        });
      }
    );

  }

  return (
    <SafeAreaView >
      <ScrollView>
        {/* <ImageBackground source={require('../assets/game_bg.png')} style={globalStyles.container}> */}
        <View style={globalStyles.input}>
          {<Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf: "center" }} />}
          <Button color='#6F8FAF' title="Upload Profile Picture" onPress={pickImage} />
        </View>
        <Formik
          initialValues={{ name: profile.name, matricsid: profile.matricsid, gender: profile.gender, session: profile.session, semester: profile.semester, department: profile.department }}
          // validationSchema={updateSchema}
          onSubmit={(values, actions) => {
            // actions contain some methods to call on form
            updateProfile(values, actions, imageUrl);
          }}>
          {(formikProps) => (
            <View>
              <Card>

                <Text>Name:</Text>
                <TextInput
                  onChangeText={formikProps.handleChange('name')}
                  value={formikProps.values.name}
                  style={globalStyles.input}
                />
                <Text style={globalStyles.errorText}>{formikProps.touched.name && formikProps.errors.name}</Text>
                
                <Text>Matrics ID:</Text>
                <TextInput
                  onChangeText={formikProps.handleChange('matricsid')}
                  value={formikProps.values.matricsid}
                  style={globalStyles.input}
                />
                <Text style={globalStyles.errorText}>{formikProps.touched.matricsid && formikProps.errors.matricsid}</Text>
                
                <Text>Gender:</Text>
                <RNPickerSelect
                  placeholder={
                    {
                      label: 'Select gender',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  items={genderChoice}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                  onValueChange={formikProps.handleChange('gender')}
                  value={formikProps.values.gender}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                  }}
                />

                <Text>Intake Session:</Text>
                <RNPickerSelect
                  placeholder={
                    {
                      label: 'Select session',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  items={intakeChoice}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                  onValueChange={formikProps.handleChange('session')}
                  value={formikProps.values.session}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                  }}
                />

                <Text>Semester:</Text>
                <RNPickerSelect
                  placeholder={
                    {
                      label: 'Select semester',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  items={semesterChoice}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                  onValueChange={formikProps.handleChange('semester')}
                  value={formikProps.values.semester}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                  }}
                />

                <Text>Department:</Text>
                <RNPickerSelect
                  placeholder={
                    {
                      label: 'Select department',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  items={departmentChoice}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 10,
                      right: 12,
                    },
                  }}
                  onValueChange={formikProps.handleChange('department')}
                  value={formikProps.values.department}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                  }}
                />
              </Card>

              <CenterButton
                text='Update'
                //this runs the function 'onSubmit'
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}

        </Formik>
        {/* </ImageBackground> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default editProfile;

// refactor!
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginBottom: 18,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
});