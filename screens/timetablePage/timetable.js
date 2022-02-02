import React, {useState, useContext} from 'react';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import TimeTable from '@mikezzb/react-native-timetable';
import { StyleSheet, 
    Text, 
    View, 
    Button,
    Modal,
   LogBox,
   Alert, 

  } from 'react-native';

if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])
export default function Timetable (){

const { user, Logout, profile } = useContext(AuthContext);

const current = [
  {
    Semester: 4,
    CourseCode: "GIG1004",
    courseId: "GIG1004",
    Subject: "INFORMATION LITERACY",
    Grades: null,
    CreditHours: 2,
    GradePoints: null,
    color: 'rgba(253,149,141,1)',
    day: 1,
    Days: "Monday",
    startTime: '12:30',
    endTime: '14:00',
    Place: "Online",
    location: "Online",
    Time: "12.00pm - 14.00pm"
  },
  {
    Semester: 4,
    CourseCode: "GIS1007",
    courseId: "GIS1007",
    Subject: "INTRODUCTION TO POLICY AND MANAGEMENT OF SCIENCE AND TECHNOLOGY",
    Grades: null,
    CreditHours: 2,
    GradePoints: null,
    color: 'rgba(253,149,141,1)',
    day: 4,
    Days: "Thursday",
    startTime: '8:30',
    endTime: '10:00',
    Place: "Online",
    location: "Online",
    Time: "8.30am - 10.00am"
  },
  {
    Semester: 4,
    CourseCode: "GLT1009",
    courseId: "GLT1009",
    Subject: "MASTERING ENGLISH VI",
    Grades: null,
    CreditHours: 3,
    GradePoints: null,
    color: 'rgba(0,142,204,1)',
    day: 3,
    Days: "wednesday",
    startTime: '14:00',
    endTime: '16:00',
    Place: "Online",
    location: "Online",
    Time:"14.00pm - 16.00pm"
  },
  {
    Semester: 4,
    CourseCode: "WIA2004",
    courseId: "WIA2004",
    Subject: "OPERATING SYSTEMS",
    Grades: null,
    CreditHours: 4,
    GradePoints: null,
    color: 'rgba(241,153,40,1)',
    day: 1,
    Days: "Monday",
    startTime: '9:00',
    endTime: '10:00',
    Place: "Online",
    location: "Online",
    Time: "9.00am - 10.00am"
  },
  {
    Semester: 4,
    CourseCode: "WIA2005",
    courseId: "WIA2005",
    Subject: "ALGORITHM DESGIN AND ANALYSIS",
    Grades: null,
    CreditHours: 4,
    GradePoints: null,
    color: 'rgba(253,149,141,1)',
    day: 2,
    Days: "Tuesday",
    startTime: '16:00',
    endTime: '17:00',
    Place: "Online",
    location: "Online",
    Time: "16.00pm - 17.00pm"
  },
  {
    Semester: 4,
    CourseCode: "WIC2002",
    courseId: "WIC2002",
    Subject: "NETWORK SECURITY",
    Grades: null,
    CreditHours: 3,
    GradePoints: null,
    color: 'rgba(3,218,197,1)',
    day: 3,
    Days: "Wednesday",
    startTime: '11:30',
    endTime: '13:00',
    Place: "Online",
    location: "Online",
    Time:"11.30am - 13.00pm"
  },
  {
    Semester: 4,
    CourseCode: "WIC2004",
    courseId: "WIC2004",
    Subject: "INTERNET TECHNOLOGY",
    Grades: null,
    CreditHours: 3,
    GradePoints: null,
    color: 'rgba(0,142,204,1)',
    day: 2,
    Days: "Tuesday",
    startTime: '11:00',
    endTime: '12:00',
    Place: "Online",
    location: "Online",
    Time: "11.00am - 12.00pm"
  },
]

const data = [
  {
    Semester: 1,
    CourseCode: "GIG1001",
    Subject: "THE ISLAMIC AND ASIAN CIVILIZATION",
    Grades: "A-",
    CreditHours: 2,
    GradePoints: 7.40
  },
  {
    Semester: 1,
    CourseCode: "WIA1001",
    Subject: "INFORMATION SYSTEMS",
    Grades: "B+",
    CreditHours: 3,
    GradePoints: 9.90
  },
  {
    Semester: 1,
    CourseCode: "WIX1001",
    Subject: "COMPUTING MATHEMATICS I",
    Grades: "B",
    CreditHours: 3,
    GradePoints: 9.0
  },
  {
    Semester: 1,
    CourseCode: "WIX1002",
    Subject: "FUNDAMENTALS OF PROGRAMMING",
    Grades: "A-",
    CreditHours: 5,
    GradePoints: 18.5
  },
  {
    Semester: 1,
    CourseCode: "WIX1003",
    Subject: "COMPUTER SYSTEMS AND ORGANIZATION",
    Grades: "A-",
    CreditHours: 3,
    GradePoints: 11.1
  },

  {
    Semester: 2,
    CourseCode: "GIG1002",
    Subject: "ETHNIC RELATIONS",
    Grades: "B+",
    CreditHours: 2,
    GradePoints: 6.60
  },
  {
    Semester: 2,
    CourseCode: "GIG1005",
    Subject: "SOCIAL ENGAGEMENT",
    Grades: "A",
    CreditHours: 2,
    GradePoints: 8
  },
  {
    Semester: 2,
    CourseCode: "WIA1002",
    Subject: "DATA STRUCTURE",
    Grades: "C",
    CreditHours: 5,
    GradePoints: 10.0
  },
  {
    Semester: 2,
    CourseCode: "WIA1003",
    Subject: "COMPUTER SYSTEM ARCHITECTURE",
    Grades: "C+",
    CreditHours: 3,
    GradePoints: 6.90,
  },
  {
    Semester: 2,
    CourseCode: "WIA1004",
    Subject: "FUNDAMENTALS OF ARTIFICIAL INTELLIGENCE",
    Grades: "A",
    CreditHours: 3,
    GradePoints: 12.0
  },
  {
    Semester: 2,
    CourseCode: "WIA1005",
    Subject: "NETWORK TECHNOLOGY FOUNDATION",
    Grades: "A-",
    CreditHours: 4,
    GradePoints: 14.8
  },
  {
    Semester: 3,
    CourseCode: "GIG1003",
    Subject: "BASIC ENTREPRENEURSHIP CULTURE",
    Grades: "A+",
    CreditHours: 2,
    GradePoints: 8.0
  },
  {
    Semester: 3,
    CourseCode: "GKP1001",
    Subject: "TALENT DEVELOPMENT",
    Grades: "A+",
    CreditHours: 2,
    GradePoints: 8.0
  },
  {
    Semester: 3,
    CourseCode: "WIA2001",
    Subject: "DATABASE",
    Grades: "A-",
    CreditHours: 3,
    GradePoints: 11.10
  },
  {
    Semester: 3,
    CourseCode: "WIA2002",
    Subject: "SOFTWARE MODELLING",
    Grades: "A-",
    CreditHours: 3,
    GradePoints: 11.10
  },
  {
    Semester: 3,
    CourseCode: "WIA2003",
    Subject: "PROBABILITY AND STATISTIC",
    Grades: "B",
    CreditHours: 3,
    GradePoints: 9.0
  },
  {
    Semester: 3,
    CourseCode: "WIC2003",
    Subject: "DIGITAL DESIGN AND HARDWARE DESCRIPTION LANGUAGE",
    Grades: "A+",
    CreditHours: 3,
    GradePoints: 12.0
  },
  {
    Semester: 3,
    CourseCode: "WIX2001",
    Subject: "THINKING AND COMMUNICATION SKILLS",
    Grades: "A",
    CreditHours: 3,
    GradePoints: 12.0
  },
  {
    Semester: 3,
    CourseCode: "WIX2002",
    Subject: "PROJECT MANAGEMENT",
    Grades: "A-",
    CreditHours: 3,
    GradePoints: 11.10
  },

];

const [dataList, setDataList] = useState(current)   
//credit hour calculation cuurent semester 
const totalCreditHours = dataList.reduce(
  (p, c)=>p+c.CreditHours, 0);

const [dataL, setDataL] = useState(data)  
//cumulative credit hours yg dah ambil
const cumulativeCreditHours = dataL.reduce(
  (p, c)=>p+c.CreditHours, 0);

// total remaining to take 
const total = (totalCreditHours + cumulativeCreditHours)
const sum = (117 - total)

const [modalOpenz, setModalOpensz] = useState(false);

return (
<View style={{flex:1}}>
  <Header text="Timetable"/>
    
        <View style={style.modalopen} >
            <View  style={style.infocontainer}>
                <Button 
                color="steelblue"
                title="Current Semester Details"
                onPress ={() =>  setModalOpensz (true)}
                > 
                </Button>
            </View>   

            <Modal
              transparent ={true}
              visible={modalOpenz}
            >
              <View style={style.modalCont}>
                <View style={style.modalcont1}> 
                    <Text style={style.textDetail}>
                      CREDIT HOUR
                    </Text>

                    <Text style={style.textDetail}>
                      Current semester: {totalCreditHours}
                    </Text>
                    <Text style={style.textDetail}>
                      Total cumulative: {cumulativeCreditHours}
                    </Text>
                    <Text style={style.textDetail}>
                      Total remaining to take: {sum}
                    </Text>
                    <View  style={style.closeinfocontainer}>
                        <Button 
                        color="steelblue"
                        title="Close"
                          onPress ={() =>  setModalOpensz (false)}
                        > 
                        </Button>
                    </View>
                </View>
              </View>
            </Modal>
        </View>

            <View >
              <TimeTable
                events={current}
                eventOnPress={(item) => Alert.alert(
                  item.CourseCode, 
                  item.Subject + "\n"+ "Credit hour: " + item.CreditHours 
                  + "\n" + "Day: " + item.Days
                  + "\n" + "Time: " + item.Time
                  + "\n" + "Location: " + item.Place)}
           
              />
            </View>
     
  </View>
      )
  }

  const style = StyleSheet.create({

    closeinfocontainer:{
      width:200,
      height: 40,
      alignSelf: 'center',
      marginTop: 50,  
    },
    
    infocontainer: {
      width:370,
      height: 40,
    },

    textDetail:{
      fontSize: 15, 
      paddingTop: 20, 
      paddingLeft: 20,
      fontWeight: 'bold',
    },

    modalopen:{
      marginBottom:10, 
      alignItems:'center', 
      marginTop:10
    },

    modalCont:{
      backgroundColor:'#000000aa', 
      flex: 1
    },
    modalcont1:{
      backgroundColor:'white', 
      margin:40, 
      height:550, 
      borderRadius: 10
    },


  })
