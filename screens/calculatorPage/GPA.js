import React, {useState, useContext} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import { Icon } from 'react-native-elements';
import { StyleSheet, 
    Text, 
    View, 
    LogBox,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
  
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function GPA(){
    const { user, Logout, profile } = useContext(AuthContext);

    const listTab =[
      {
        Semester: 1
      },
      {
        Semester: 2
      },
      {
        Semester: 3
      },
      {
        Semester: 4
      },
      {
        Semester: 5
      },
      {
        Semester: 6
      },
      {
        Semester: 7
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

    ]
    
  const [semester, setSemester] = useState(null);
  const [dataList, setDataList] = useState(data)   

  //total grade points
  const totalGradePoints = dataList.reduce(
  (previousScore, currentScore, index)=>previousScore+currentScore.GradePoints, 0).toFixed(2);
  //console.log("Grade Point:", totalGradePoints);
  
  //total credit hours
  const totalCreditHours = dataList.reduce(
  (p, c)=>p+c.CreditHours, 0);
  //console.log("Credit Hours:",totalCreditHours);
  
  //GPA total
  const GPAtotal = (totalGradePoints / totalCreditHours).toFixed(2); 
  //console.log("GPA:", GPAtotal);


  const setStatusFilter = Semester => {
   
    setDataList([...data.filter(e => e.Semester === Semester)]);
    setSemester(Semester)
  }

  const renderItem = ({item, index}) => {

    return (
      <ScrollView>
      <View key={index} style={style.itemContainer}>
        <View style={style.subjectBody}>
          <Text style={style.subjectFont}>{item.CourseCode}  {item.Subject}</Text>
          <Text style={style.gradeFont}> {item.Grades}</Text>
        </View>
      </View>
      </ScrollView>
    )
  }
 
      return(
        <SafeAreaView style={style.container}>
        <Header text="GPA Result" />
          <View style ={style.resultcontainer}>
            <Text style={style.resultfont}>
              GPA result for selected semester</Text>
              <Text style={style.Gpafont}> {GPAtotal}</Text>

              <View style={style.congratscontainer}>
                <Text style={style.congratsfont}>Congratulations!</Text>
                <Icon
                        style={{paddingTop: 17, paddingRight:20}}
                        name='trophy'
                        type='font-awesome-5'
                        color='steelblue' 
                        size={15}
                        
                        />
              </View>
          </View>

          <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
            <View style={style.listTab}>
              {
                listTab.map(e =>(
                  <TouchableOpacity 
                  style={[style.btnTab, semester === e.Semester && style.btnTabActive]}
                  onPress={() => setStatusFilter(e.Semester)}
                  >
                    <Text style={style.textTab}>
                      {e.Semester}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>

          <FlatList
          data = {dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
  
  container:{
    flex: 1,
    marginBottom:30,
  }, 

  listTab:{
    flexDirection:'row',
    marginBottom:30,
  },

  btnTab:{
    width: Dimensions.get('window').width/5.6,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#EBEBEB',
    padding:10,
    borderRadius:20,
    margin:5,
    height:40,
  },

  textTab:{
    fontSize:15,
    color:'black',
    paddingLeft:20
   
  },

  btnTabActive:{
    backgroundColor:'steelblue'
  },

  itemContainer:{
    paddingVertical:10,
    flexDirection:'row',
    alignSelf:'center',
  },

  subjectFont:{
    fontSize:12,
    width:'80%'
  },
  
  subjectBody:{
    paddingHorizontal:15,
    paddingVertical:15,
    borderRadius:20,
    borderColor:'steelblue',
    borderWidth:0.5,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    width: 350
  },

  gradeFont:{
  marginRight:10
  },

  resultfont:{
    fontWeight:'bold',
    fontSize:15,
    paddingTop:20,
    paddingBottom:10,
    color:'white'
  },

  Gpafont:{
    fontWeight:'bold',
    fontSize:25,
    paddingBottom:20,
    color:'lightgreen'
  },

  resultcontainer:{
    backgroundColor:'#6F8FAF',
    borderRadius:20,
    margin:20,
    alignItems:'center',
  },

  congratscontainer:{
    backgroundColor:'#f37e50',
    borderRadius:20,
    borderWidth:0.5,
    borderColor:'darkblue',
    marginBottom:20,
    flexDirection:'row'
  },

  congratsfont:{
    paddingHorizontal: 15,
    paddingVertical:15,
  },
  
  })
