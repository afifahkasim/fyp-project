import React,{useState, useContext, useEffect} from 'react';
import { Icon } from 'react-native-elements';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';

import { StyleSheet, 
    Text, 
    View, 
    Pressable,
    LogBox,
    TextInput,
    Button,
    Modal,
    ScrollView,

  } from 'react-native';
    
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Calculator({navigation}){

  const { user, Logout, profile } = useContext(AuthContext);

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

  const current = [
    {
      Semester: 4,
      CourseCode: "GIG1004",
      Subject: "INFORMATION LITERACY",
      Grades: null,
      CreditHours: 2,
      GradePoints: null
    },
    {
      Semester: 4,
      CourseCode: "GIS1007",
      Subject: "INTRODUCTION TO POLICY AND MANAGEMENT OF SCIENCE AND TECHNOLOGY",
      Grades: null,
      CreditHours: 2,
      GradePoints: null
    },
    {
      Semester: 4,
      CourseCode: "GLT1009",
      Subject: "MASTERING ENGLISH VI",
      Grades: null,
      CreditHours: 3,
      GradePoints: null
    },
    {
      Semester: 4,
      CourseCode: "WIA2004",
      Subject: "OPERATING SYSTEMS",
      Grades: null,
      CreditHours: 4,
      GradePoints: null
    },
    {
      Semester: 4,
      CourseCode: "WIA2005",
      Subject: "ALGORITHM DESGIN AND ANALYSIS",
      Grades: null,
      CreditHours: 4,
      GradePoints: null
    },
    {
      Semester: 4,
      CourseCode: "WIC2002",
      Subject: "NETWORK SECURITY",
      Grades: null,
      CreditHours: 3,
      GradePoints: null
    },
    {
      Semester: 4,
      CourseCode: "WIC2004",
      Subject: "INTERNET TECHNOLOGY",
      Grades: null,
      CreditHours: 3,
      GradePoints: null
    },
  ]

//Semester 1
const GradepointsSem1 = data.reduce((prev, current) => {
 if ( current.Semester <= 1) prev += current.GradePoints;
 return prev;}, 0);


const CreditHoursSem1 = data.reduce((prev, current) => {
  if (current.Semester <= 1) prev = prev + current.CreditHours;
  return prev;}, 0);


const CGPAsem1 = (GradepointsSem1/ CreditHoursSem1).toFixed(2); 



//Semester 2
const GradepointsSem2 = data.reduce((prev, current ) => {
  if (current.Semester <= 2 ) prev = prev + current.GradePoints ;
  return prev;}, 0);
 

 const CreditHoursSem2  = data.reduce(( prev, current) => {
  if (current.Semester <= 2 )
    prev = prev + current.CreditHours;
  return prev ;}, 0);
 

 const CGPAsem2 = (GradepointsSem2/ CreditHoursSem2).toFixed(2); 
 


 //Semester 3 
const GradepointsSem3 = data.reduce((prev, current) => {
  if (current.Semester <= 3) prev += current.GradePoints;
  return prev;},  0);
 

 const CreditHoursSem3 =data.reduce((prev, current) => {
  if (current.Semester <= 3) prev += current.CreditHours;
  return prev;}, 0);


 const CGPAsem3 = (GradepointsSem3/ CreditHoursSem3 ).toFixed(2); 


  //Semester 4
const GradepointsSem4 = data.reduce((prev, current) => {
  if (current.Semester <= 4) prev += current.GradePoints;
  return prev;},  0);
 const CreditHoursSem4 = data.reduce((prev, current) => {
  if (current.Semester <= 4) prev += current.CreditHours;
  return prev; }, 0);
 const CGPAsem4 = (GradepointsSem4/CreditHoursSem4).toFixed(2); 

   //Semester 5
const GradepointsSem5 = data.reduce((prev, current) => {
  if (current.Semester <= 5) prev += current.GradePoints;
  return prev;}, 0);
 const CreditHoursSem5 = data.reduce((prev, current) => {
  if (current.Semester <= 5) prev += current.CreditHours;
  return prev;}, 0);
 const CGPAsem5 = (GradepointsSem5/ CreditHoursSem5).toFixed(2); 

   //Semester 6
const GradepointsSem6 = data.reduce((prev, current) => {
  if (current.Semester <= 6) prev += current.GradePoints;
  return prev;}, 0);

 const CreditHoursSem6 = data.reduce((prev, current) => {
  if (current.Semester <= 6) prev += current.CreditHours;
  return prev;}, 0);

 const CGPAsem6 = (GradepointsSem6/ CreditHoursSem6).toFixed(2); 

   //Semester 7
   const GradepointsSem7 = data.reduce((prev, current) => {
    if (current.Semester <= 7) prev += current.GradePoints;
    return prev;}, 0);
  
   const CreditHoursSem7 = data.reduce((prev, current) => {
    if (current.Semester <= 7) prev += current.CreditHours;
    return prev;}, 0);
  
   const CGPAsem7 = (GradepointsSem7/ CreditHoursSem7).toFixed(2); 


//cgpa target

//const maxSem = Math.max(...data.map(sem => sem.Semester));
//const actualSem = maxSem +1;

//cari total credit hour
const PastCH = data.reduce((prev, current) => {prev += current.CreditHours;
  return prev;}, 0);
 

const CurrentCH = current.reduce((prev, current) => {prev += current.CreditHours;
  return prev;}, 0);

const totalCH =PastCH + CurrentCH;


//cari current Grade point
const [target, setTarget] = useState("");

const CurrentGP = (CurrentCH * target); 


//grade point semester lepas
const PastGP = data.reduce((prev, current) => {prev += current.GradePoints;
  return prev;}, 0);
  

const totalGP = (CurrentGP + PastGP).toFixed(2);


//cgpa target
const CGPA = (totalGP/totalCH).toFixed(2);


//recommendation grade:
const [message,setMessage] = useState("helllllllooo")

  useEffect(() => {
    let mm = target;

    if(mm <= 3.0){
      setMessage("Minimum 1 A in any sujects")
    }
    else if (3.0 < mm <= 3.5){
      setMessage("Minimum 3 A in any subjects")
    }
    else if(3.5< mm <= 4.0){
      setMessage("All A or Minimum 5 A in any subjects")
    }
    else{
      setMessage(" ")
    }
  })


const [modalOpen,  setModalOpenz] = useState(false);

  const GPAPressHandler = () => {  
    navigation.navigate('GPA');  
  }
  const CGPAPressHandler = () => {  
    navigation.navigate('CGPA');  
  }

      return(
    <View style={{flex:1}}> 
          <Header text="Calculator" />
      <ScrollView>
          <View  style={style.infocontainer}>
             <Button 
             color="steelblue"
             title=" List of grade and method to calculate"
             onPress ={() =>  setModalOpenz (true)}
             > 
             </Button>
          </View>

          <Modal
          transparent ={true}
          visible={modalOpen}
          animationType='fade'
          >
            <View style={{ backgroundColor:'#000000aa', flex: 1}}>
              <View style={{backgroundColor:'white', margin:40, height:600, borderRadius: 10}}> 

              <Text style={{ fontSize: 15, paddingTop: 20, paddingLeft: 20, fontWeight:'bold' }}>
                University of Malaya's grade and grade point list:
              </Text>
              <Text style={{ fontSize: 15, paddingTop: 20, paddingLeft: 30}}>
               A+      100-90       4.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               A         89-80         4.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               A-        79-75         3.7
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               B+       74-70         3.3
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               B         69-65         3.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               B-        64-60         2.7
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               C+       59-55         2.3
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               C         54-50         2.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               C-        49-45        1.7
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               D+       44-40        1.3
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30}}>
               D         39-35        1.0
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 30, marginBottom: 20 }}>
               F         34-00         0.0
              </Text>

              <Text style={{ fontSize: 15, paddingTop: 20, paddingLeft: 20,fontWeight:'bold', marginBottom: 20  }}>
              Formula:
              </Text>
              <Text style={{ fontSize: 12, paddingLeft: 20, marginBottom: 20 }}>
              GPA = Total of grade point / Total of credit hours 
              </Text>
              <Text style={{ fontSize: 12, paddingLeft: 20, marginBottom: 50 }}>
              CGPA = Sum of Total grade point / Sum of total credit hours
              </Text>
              
              <View  style={style.closeinfocontainer}>
                <Button 
                 color="steelblue"
                 title="Close"
                  onPress ={() =>  setModalOpenz (false)}
                > 
                </Button>
              </View>
              </View>
            </View>
         </Modal>
          <View>
          <Pressable onPress={GPAPressHandler}>
              <View style={style.frontcalbutton}>
              <Icon
                        style={{paddingTop: 17, paddingRight:20}}
                        name='calendar-alt'
                        type='font-awesome-5'
                        color='pink' 
                        size={15}
                        
                        />
                <Text style={style.frontcaltext}>Semester Result</Text>
              </View>
          </Pressable>

          </View>

          <View style={style.showCGPA}>
            <Text style={style.CGPAfont}>CGPA</Text>
              <Text style={style.semesterfont}>Semester 1: {CGPAsem1}</Text>
              <Text style={style.semesterfont}>Semester 2: {CGPAsem2}</Text>
              <Text style={style.semesterfont}>Semester 3: {CGPAsem3}</Text>
              <Text style={style.semesterfont}>Semester 4: {CGPAsem4}</Text>
              <Text style={style.semesterfont}>Semester 5: {CGPAsem5}</Text>
              <Text style={style.semesterfont}>Semester 6: {CGPAsem6}</Text>
              <Text style={style.semesterfont}>Semester 7: {CGPAsem7} </Text>

            <View style= {style.gpatargetcont}>
            <Text style={style.targetfont}>GPA target: {target}</Text>
            </View>

            <View style= {style.cgpatargetcont}>
            <Text style={style.targetfont}>Your CGPA: {CGPA}</Text>
            </View>

            <View style= {style.targetcont}>
            <Text style={style.targetfont}>Recommendation grade: {message}</Text>
            </View>

          </View>

          <View style={style.calculateTarget}>
            <View style={style.subcontainer}>
              <Text style={style.calfont}>GPA Target for this semester:</Text>
                <View>
                  <TextInput       
                        style={style.gradeinput}
                        onChangeText={(text) => setTarget(text)}
                        placeholder="4.00"
                        keyboardType="numeric"
                        value={target}
                        maxLength={4}/>   
                </View>
            </View>
          </View>
          </ScrollView>
        </View>
      )
  }

  const style = StyleSheet.create({
    
    infocontainer: {
      width:370,
      height: 40,
      marginLeft:10,
      marginTop: 10,
    },
    closeinfocontainer:{
      width:200,
      height: 40,
      alignSelf: 'center',  
    },
    
    frontcalbutton:{
      width: 300,
      height: 50,
      borderRadius: 20,
      alignSelf: 'center',
      backgroundColor: '#6F8FAF',
      marginTop: 20,  
      flexDirection:'row',
      paddingLeft:70
    },
 
    frontcaltext:{
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 15,
      color:'white'
    },

    showCGPA:{
      height:470,
      width:380,
      backgroundColor:'white',
      alignSelf:'center',
      borderRadius:20,
      borderWidth:0.5,
      borderColor:'#6F8FAF',
      marginTop: 30,
    },

    CGPAfont:{
      fontWeight:'bold',
      paddingHorizontal: 40,
      paddingTop:15,
      fontSize:15,
      color:'steelblue'
    },

    semesterfont:{
      paddingLeft:60,
      paddingVertical:5,
      color:'steelblue'
    },

    targetfont:{
      fontSize:15,
      fontStyle:'italic',
      paddingLeft:30,
      paddingVertical:15,
      color:'white'
    },

    cgpatargetcont:{
      marginHorizontal:100,
      backgroundColor:'#6F8FAF',
      borderRadius:20,
      marginBottom:5,
    },

    gpatargetcont:{
      marginHorizontal:100,
      backgroundColor:'#6F8FAF',
      borderRadius:20,
      marginBottom:5,
      marginTop:10,
    },

    targetcont:{
      marginVertical:5,
      marginHorizontal:20,
      backgroundColor:'#6F8FAF',
      borderRadius:20,
    },

    calculateTarget:{
      width: 370,
      alignSelf:'center',
      marginTop: 10,
      borderRadius:20,
      flexDirection:'row',
      marginBottom:20
    },
    calfont:{
      fontWeight:'bold',
      paddingVertical:20,
      paddingLeft:20,
    },
    gradeinput:{
      alignItems:'center',
      borderWidth: 1,
      borderColor:'steelblue',
      height:40,
      width: 60,
      backgroundColor: 'white',
      borderRadius:15,
      paddingLeft: 15,
      marginLeft:30,
    },

    subcontainer:{
      flexDirection:'row',
      alignItems:'center',
      flexWrap:'wrap',
      //justifyContent:'space-between'
    },

    caltarget:{
      marginLeft:10
    }
    })
