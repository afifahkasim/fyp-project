import React,{useState, useContext}  from 'react';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import { StyleSheet, 
    Text, 
    View, 
    LogBox,
    FlatList, 

   
  } from 'react-native';

  if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

  const db = firebase.firestore();
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function SEPlanner({navigation}){

    const { user, Logout, profile } = useContext(AuthContext);

    const courseDataIS=[
      {
        Course_code: "GIG1012/GLT1017",
        Course_name: "Philosophy and Current Issues (for local student only) / Basic Malay Language (for international student)",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 1,
        Year: "2020/2021",
      },
  
      {
        Course_code: "WIX1001",
        Course_name: "Computing Mathematics I",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 1,
        Year: "2020/2021",
      },
  
      {
        Course_code: "WIX1002",
        Course_name: "Fundamentals of Programming",
        Course_explanation: "heellloo",
        Credit_hour: 5,
        Semester: 1,
        Year: "2020/2021",
      },
      {
        Course_code: "WIX1003",
        Course_name: "Computer System and Organization",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 1,
        Year: "2020/2021",
      },
      {
        Course_code: "WIX1003",
        Course_name: "Information Systems",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 1,
        Year: "2020/2021",
      },

      {
        Course_code: "GIG1013",
        Course_name: "Appreciation of Ethics and Civilizations",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 2,
        Year: "2020/2021",
      },
      {
        Course_code: "GIG1005",
        Course_name: "Social Engagement",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 2,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA1002",
        Course_name: "Data Structure (#WIX1002)",
        Course_explanation: "heellloo",
        Credit_hour: 5,
        Semester: 2,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA1003",
        Course_name: "Computer System Architecture (#WIX1003)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 2,
        Year: "2020/2021",
      },

      {
        Course_code: "WIA1004",
        Course_name: "Fundamentals of Artificial Intelligence",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 2,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA1005",
        Course_name: "Network Technology Foundation",
        Course_explanation: "heellloo",
        Credit_hour: 4,
        Semester: 2,
        Year: "2020/2021",
      },

      {
        Course_code: "-",
        Course_name: "Co-Curriculum",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "GLTXXXX",
        Course_name: "English for Communication (1)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "GIG1003",
        Course_name: "Basic Entrepreneurship Culture",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "WIX2001",
        Course_name: "Thinking and Communication Skills",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "WIX2002",
        Course_name: "Project Management",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA2001",
        Course_name: "Database",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA2002",
        Course_name: "Software Modelling",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA2003",
        Course_name: "Probability and Statistics ",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 3,
        Year: "2020/2021",
      },
      {
        Course_code: "GLTXXXX",
        Course_name: "English for Communication (2)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "GIG1004",
        Course_name: "Information Literacy",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA2004",
        Course_name: "Operating Systems",
        Course_explanation: "heellloo",
        Credit_hour: 4,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA2005",
        Course_name: "Algorithm Design and Analysis (#WIA1002) ",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (1)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (2)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (3)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 4,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA3001",
        Course_name: "Industrial Training",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 5,
        Year: "2020/2021",
      },
      {
        Course_code: "WIA3002",
        Course_name: "Academic Project I",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 6,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (4)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 6,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (5)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 6,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (6)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 6,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (7)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 6,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Faculty Elective (1)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 6,
        Year: "2020/2021",
      },

      {
        Course_code: "WIA3003",
        Course_name: "Academic Project II",
        Course_explanation: "heellloo",
        Credit_hour: 5,
        Semester: 7,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (8)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 7,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (9)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 7,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Specialization Elective (10)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 7,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "Faculty Elective (2)",
        Course_explanation: "heellloo",
        Credit_hour: 3,
        Semester: 7,
        Year: "2020/2021",
      },
      {
        Course_code: "-",
        Course_name: "External Faculty Elective",
        Course_explanation: "heellloo",
        Credit_hour: 2,
        Semester: 7,
        Year: "2020/2021",
      },
  
    ];

    const [dataList, setDataList] = useState(courseDataIS)   
    //credit hour calculation
    const totalCreditHours = dataList.reduce(
      (p, c)=>p+c.Credit_hour, 0);

    const item = ({item}) =>{
      return(
        <View style={{flexDirection:'row'}}>
          <View style={style.tabletimecontainer}>
            <Text style={{fontSize:10}}>{item.Semester}</Text>
          </View>
          <View style={style.coursecontainer}>
            <Text style={{fontSize:10}}>{item.Course_name}</Text>
          </View>
          <View style={style.tablecontainer}>
            <Text style={{fontSize:10}}>{item.Credit_hour}</Text>
          </View>
        </View>
      )
    }

      return(
       
    <View style={{flex:1}}>
            <Header text="Course Planner" />

            <View style={{marginBottom:20, marginLeft:20, marginTop:10}}>
                <Text>Course Planner: Software Engineering</Text>
                <Text>Total Cumulative: {totalCreditHours} Credit Hours</Text>
            </View>

            <View style={{flexDirection:'row', position: 'relative'}}>
                <View style={style.semestercontainer}>
                  <Text >Sem</Text>
                </View>
                <View style={style.coursecontainer}>
                  <Text>Course</Text>
                </View>
                <View style={style.chcontainer}>
                  <Text>Credit Hour</Text>
                </View>
            </View>
            
            <FlatList
                data={courseDataIS}
                renderItem={item}
                keyExtractor={(item,index) => index.toString()}
            />         
    </View>
  
      )
  };

  const style = StyleSheet.create({

    chcontainer:{
      width: 70, 
      backgroundColor:'white',
      alignItems:'center',
      borderWidth:1,
      borderWidth:0.5,
      borderColor:'skyblue',
      position:'relative'
    },

    coursecontainer:{
      width: 250, 
      backgroundColor:'white',
      alignItems:'center',
      borderWidth:1,
      borderWidth:0.5,
      borderColor:'skyblue',
      position:'relative'
    },

    semestercontainer:{
      width: 50, 
      backgroundColor:'white',
      borderWidth:1,
      borderWidth:0.5,
      borderColor:'skyblue',
      alignItems:'center',
      position:'relative',
      marginLeft:10,
    },

    tablecontainer:{
      width: 70,  
      height:40, 
      backgroundColor:'white',
      borderWidth:1,
      borderWidth:0.5,
      borderColor:'skyblue',
      alignItems:'center',
      position:'relative',
      paddingTop:5
    },

    coursecontainer:{
      width: 250,  
      height:40, 
      backgroundColor:'white',
      borderWidth:1,
      borderWidth:0.5,
      borderColor:'skyblue',
      alignItems:'center',
      position:'relative',
      paddingTop:5
    },

    tabletimecontainer:{
      width: 50,  
      height:40, 
      backgroundColor:'white',
      borderWidth:1,
      borderWidth:0.5,
      borderColor:'skyblue',
      paddingTop:10,
      paddingLeft:20,
      position:'relative',
      marginLeft:10
    },


  })
