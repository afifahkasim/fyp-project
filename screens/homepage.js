import React, { useState, useContext, useEffect  } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
  LogBox,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import { Icon } from 'react-native-elements';
import 'firebase/compat/firestore';
import { AuthContext } from "../routes/authProvider";
import HomepageHeader from "../shared/headerHomepage";
import Footer from "../shared/footer";

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function Homepage({ navigation }) {
  // const {SubmitProfile} = useContext(AuthContext)
  const { user, profile, Logout } = useContext(AuthContext);
 

  const pressProfile = () => {
    navigation.navigate('Profile')
  }

  const pressGroup = () => {
    navigation.navigate('Group')
  }

  const pressMyDashboard = () => {
    navigation.navigate('MyDashboard')
  }

  const pressGroupDashboard = () => {
    navigation.navigate('GroupDashboard')
  }

  const pressCalculator = () => {
    navigation.navigate('Calculator')
  }

  const pressSelfReminder = () => {
    navigation.navigate('SelfReminder')
  }

  const pressTimetable = () => {
    navigation.navigate('Timetable')
  }

  const pressScheduler = () => {
    navigation.navigate('Coursescheduler')
  }

  const pressHomepage = () => {
    navigation.navigate('Homepage')
  }

  const data = [
    {id: 1, quote: 'You don’t have to be great to start, but you have to start to be great.'},
    {id: 4, quote: 'The expert in everything was once a beginner.'},
    {id: 3, quote: 'Don’t wish it were easier; wish you were better. – Jim Rohn'},
    {id: 5, quote: 'Success is the sum of small efforts, repeated day in and day out. – Robert Collier'},
    {id: 2, quote: 'There is no substitute for hard work. – Thomas Edison'},
    {id: 6, quote: 'The difference between ordinary and extraordinary is that little “extra.”'},
    {id: 7, quote: 'It’s not going to be easy, but it’s going to be worth it.'},
  ];
  
  const randIndex = Math.floor(Math.random() * data.length);

  return (
    <View style={style.container}>
      <HomepageHeader text="Welcome to Data-U!" />
      <ScrollView style={{ paddingTop: 10 }}>
        <View>
          <Text style={{ fontSize: 15, paddingLeft: 20, paddingTop: 5, paddingBottom: 5 }}>
            Hi! How was your day today?</Text>
        </View>

        <View style={style.RBcontainer}>
          <Text></Text>
        </View>

        <TouchableOpacity>
          <View style={style.Rcontainer}>
            <Text style={style.quoteFont}>
            {data[randIndex].quote}</Text>
          </View>
        </TouchableOpacity>


        <ScrollView scrollEventThrottle={16} >
          <View style={{ flex: 1, paddingTop: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, paddingLeft: 20, fontWeight: '700' }}>
                Modules
              </Text>
              <View style={style.arrowButton}>
                <Icon
                  name='arrow-right'
                  type='font-awesome-5'
                  color='#517fa4'
                  size={15}
                />
              </View>
            </View>

            <View style={{ height: 220, marginTop: 10 }}>
              <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}>

                <Pressable onPress={pressSelfReminder}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/reminder.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text> Self-Reminder </Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={pressTimetable}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/timet.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text> Timetable </Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={pressMyDashboard}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/mydash.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text>My Dashboard </Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={pressGroupDashboard}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/gdashd.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text>Group Dashboard </Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={pressGroup}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/creategroup.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text>Add/Join Group</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={pressScheduler}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/sche.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text>Course Scheduler</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={pressCalculator}>
                  <View style={style.containerModules}>
                    <View style={{ flex: 2 }}>
                      <Image source={require('../assets/homePage/Calc.png')}
                        style={style.imageModules}
                      />
                    </View>
                    <View style={style.textModules}>
                      <Text>GPA/CGPA </Text>
                    </View>
                  </View>
                </Pressable>
              </ScrollView>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, paddingLeft: 20, marginTop: 10, fontWeight: '700' }}>
                Links
              </Text>
              <View style={style.arrow2Button}>
                <Icon
                  name='arrow-right'
                  type='font-awesome-5'
                  color='#517fa4'
                  size={15}
                />
              </View>
            </View>

            <View style={{ height: 170, marginTop: 10 }}>
              <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}>

                <Pressable onPress={() => Linking.openURL('https://maya.um.edu.my')}>
                  <View style={style.containerLinks}>
                    <View style={{ flex: 2 }}>
                      <View>
                        <Icon
                          reverse
                          name='user-graduate'
                          type='font-awesome-5'
                          color='#517fa4'
                          size={30}
                        />
                      </View>
                    </View>
                    <View style={style.containerFontLink}>
                      <Text style={style.fontLink}>Maya UM</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://spectrum.um.edu.my')}>
                  <View>
                    <View style={{ flex: 2 }}>
                      <View>
                        <Icon
                          reverse
                          name='book-open'
                          type='font-awesome-5'
                          color='#517fa4'
                          size={30}
                        />
                      </View>
                    </View>
                    <View style={style.containerFontLink}>
                      <Text style={style.fontLink}>SPEcTRUM</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://umsitsguide.um.edu.my')}>
                  <View>
                    <View style={{ flex: 2 }}>
                      <View>
                        <Icon
                          reverse
                          name='shapes'
                          type='font-awesome-5'
                          color='#517fa4'
                          size={30}
                        />
                      </View>
                    </View>
                    <View style={style.containerFontLink}>
                      <Text style={style.fontLink}>UMSitS</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://umlib.um.edu.my')}>
                  <View>
                    <View style={{ flex: 2 }}>
                      <View>
                        <Icon
                          reverse
                          name='book-reader'
                          type='font-awesome-5'
                          color='#517fa4'
                          size={30}
                        />
                      </View>
                    </View>
                    <View style={style.containerFontLink}>
                      <Text style={style.fontLink}>UM Library</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://umexpert.um.edu.my')}>
                  <View>
                    <View style={{ flex: 2 }}>
                      <View>
                        <Icon
                          reverse
                          name='chalkboard-teacher'
                          type='font-awesome-5'
                          color='#517fa4'
                          size={30}
                        />
                      </View>
                    </View>
                    <View style={style.containerFontLink}>
                      <Text style={style.fontLink}>UMEXPERT</Text>
                    </View>
                  </View>
                </Pressable>

                <Pressable onPress={() => Linking.openURL('https://fsktm.um.edu.my')}>
                  <View>
                    <View style={{ flex: 2 }}>
                      <View>
                        <Icon
                          reverse
                          name='laptop-code'
                          type='font-awesome-5'
                          color='#517fa4'
                          size={30}
                        />
                      </View>
                    </View>
                    <View style={style.containerFontLink}>
                      <Text style={style.fontLink}>FSKTM</Text>
                    </View>
                  </View>
                </Pressable>

              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <Footer a={pressHomepage} b={pressProfile}/>
      
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    //maxHeight: Dimensions.get("window").height,
    // maxWidth: Dimensions.get("window").width,
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  button: {
    width: 200,
    alignSelf: 'center'
  },

  Rcontainer: {
    backgroundColor: 'lightblue',
    marginTop: 22,
    width: 340,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
    alignItems:'center'

  },

  quoteFont:{
    fontSize: 15, 
    fontWeight:'bold',
    fontStyle:'italic',
    margin:30
  },

  RBcontainer: {
    backgroundColor: 'steelblue',
    marginTop: 46,
    width: 322,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
    position: 'absolute'
  },

  fontLink: {
    fontSize: 9,
  },

  containerFontLink: {
    paddingTop: 80,
    alignItems: 'center'
  },

  imageModules: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    marginLeft:4,
  },

  containerModules: {
    height: 210,
    width: 140,
    borderWidth: 1,
    borderRadius: 28,
    borderColor: 'steelblue',
    margin: 5
  },

  textModules: {
    flex: 1,
    paddingTop: 175,
    paddingLeft: 7,
    position: 'absolute',
    fontWeight: 'bold'
  },

  arrowButton: {
    alignSelf: 'flex-end',
    marginRight: 25,
    marginBottom: 4,
    paddingLeft: 270
  },

  arrow2Button: {
    alignSelf: 'flex-end',
    marginRight: 25,
    marginBottom: 4,
    paddingLeft: 300
  },

})
