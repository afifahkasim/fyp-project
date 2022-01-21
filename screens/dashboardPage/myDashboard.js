import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View, ImageBackground, TextInput, LogBox, StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  SafeAreaView
} from 'react-native';
import { globalStyles } from '../../styles/global';
import CenterButton from "../../shared/buttonCenter";
import { Formik } from 'formik';
import * as yup from 'yup';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { AuthContext } from "../../routes/authProvider";
import DashboardCard from '../../shared/cardDashboard';
import Card from '../../shared/card';
import Header from '../../shared/header';
import Tooltip from '../../shared/header';
import { Ionicons } from '@expo/vector-icons';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash";
import { StatusBar } from 'expo-status-bar';



//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function myDashboard({ navigation }) {
  const { user, Logout, profile } = useContext(AuthContext);
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })


  const SubjectbyGrade = {
    labels: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
    datasets: [
      {
        data: [3, 12, 5, 3, 1, 1, 1, 0, 1, 0, 0, 0],
      },
    ],
  };

  const GPAbySem = {
    // labels: [SGPAlabels[0], SGPAlabels[1]],
    // labels: semesterGPA.map(key => key.Semester),
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
    datasets: [
      {

        // data: [SGPAdata[0], SGPAdata[1]],
        // data: semesterGPA.map(key => key.GPA),
        data: [4.00, 2.89, 3.75, 3.94, 4.00],
        strokeWidth: 3, // optional
      },
    ],
  };

  const [testData, setTestData] = useState({ labels: [], data: [] })

  // Semester, Course Code, Subject, Grades, Credit Hours, Grade Points

  const [columns, setColumns] = useState([
    "Semester",
    "CourseCode",
    "Subject",
    "Grades",
    "CreditHours",
    "GradePoints"
  ])

  const [cosmeticColumns, setCosmeticColumns] = useState([
    "Sem",
    "Course\nCode",
    "Subject",
    "Grades",
    "Credit\nHours",
    "Grade\nPoints"
  ])

  const [direction, setDirection] = useState(null)

  const [selectedColumn, setSelectedColumn] = useState(null)

  const [semesterGPA, setSemesterGPA] = useState([
    {
      Semester: "Sem 1",
      GPA: 3.74
    },
    {
      Semester: "Sem 2",
      GPA: 2.69
    }
  ])

  const [results, setResults] = useState([
    {
      Semester: 1,
      CourseCode: "GIG1001",
      Subject: "THE ISLAMIC AND ASIAN CIVILIZATION",
      Grades: "A",
      CreditHours: 2,
      GradePoints: 8
    },
    {
      Semester: 1,
      CourseCode: "WIA1001",
      Subject: "INFORMATION\nSYSTEMS",
      Grades: "A-",
      CreditHours: 3,
      GradePoints: 11.1
    },
    {
      Semester: 1,
      CourseCode: "WIX1001",
      Subject: "COMPUTING MATHEMATICS I",
      Grades: "A-",
      CreditHours: 3,
      GradePoints: 11.1
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
      Subject: "ETHNIC\nRELATIONS",
      Grades: "A",
      CreditHours: 2,
      GradePoints: 8
    },
    {
      Semester: 2,
      CourseCode: "GIG1005",
      Subject: "SOCIAL\nENGAGEMENT",
      Grades: "A",
      CreditHours: 2,
      GradePoints: 8
    },
    {
      Semester: 2,
      CourseCode: "WIA1002",
      Subject: "DATA\nSTRUCTURE",
      Grades: "C-",
      CreditHours: 5,
      GradePoints: 8.5
    },
    {
      Semester: 2,
      CourseCode: "WIA1003",
      Subject: "COMPUTER SYSTEM ARCHITECTURE",
      Grades: "C",
      CreditHours: 3,
      GradePoints: 6,
    },
    {
      Semester: 2,
      CourseCode: "WIA1004",
      Subject: "FUNDAMENTALS OF ARTIFICIAL INTELLIGENCE",
      Grades: "B+",
      CreditHours: 3,
      GradePoints: 9.9
    },
    {
      Semester: 2,
      CourseCode: "WIA1005",
      Subject: "NETWORK TECHNOLOGY FOUNDATION",
      Grades: "B-",
      CreditHours: 4,
      GradePoints: 10.8
    },
  ])

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc"
    const sortedData = _.orderBy(results, [column], [newDirection])
    setSelectedColumn(column)
    setDirection(newDirection)
    setResults(sortedData)
  }

  const renderHeader = () => (
    <View style={styles.cardContainer}>

      {/* [MyDashboard] Filter */}
      <View style={styles.filterInner}>
        <Card>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={styles.filterText}>Select Semester</Text>
            <Ionicons name="arrow-down" size={20} color="black" style={{ alignContent: 'flex-end' }} />
          </View>
        </Card>
      </View>

      <View style={styles.filterInner}>
        <Card>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={styles.filterText}>Filter by Grades</Text>
            <Ionicons name="arrow-down" size={20} color="black" style={{ alignContent: 'flex-end' }} />
          </View></Card>
      </View>

      {/* [MyDashboard] Card for Total Credit Hours, CGPA, Total Grade Points */}
      <View style={styles.cardInner}>
        <DashboardCard>
          <Text style={styles.cardText}>{totalCreditHours.toFixed(0)}</Text>
          <Text style={styles.cardSubtext}>Total Credit Hours</Text>
        </DashboardCard>
      </View>

      <View style={styles.cardInner}>
        <DashboardCard>
          <Text style={styles.cardText}>{cummulativeGPA.toFixed(2)}</Text>
          <Text style={styles.cardSubtext}>CGPA</Text>
        </DashboardCard>
      </View>

      <View style={styles.cardInner}>
        <DashboardCard>
          <Text style={styles.cardText}>{renderGradePoints.toFixed(2)}</Text>
          <Text style={styles.cardSubtext}>Total Grade Points</Text>
        </DashboardCard>
      </View>

      {/* [MyDashboard] Line Chart for GPA vs Semester */}
      <DashboardCard>
        <Text style={styles.chartTitle}>GPA vs Semester</Text>
        <LineChart
          data={{
            labels: SGPAlabels,
            datasets: [{
              data: SGPAdata
            },
            {
              // to set max value
              data: [4.00],
              withDots: false
            }
          ]
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          fromZero={true}
          chartConfig={{
            color: "black",
            backgroundColor: '#B6D0E2',
            backgroundGradientFrom: '#B6D0E2',
            backgroundGradientTo: '#B6D0E2',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },

          }}
          bezier
          style={{
            marginTop: 15,
            marginRight: 10,
            borderRadius: 0
          }}

          decorator={() => {
            return tooltipPos.visible ? <View>
              <Svg>
                <Rect x={tooltipPos.x - 15}
                  y={tooltipPos.y + 10}
                  width="40"
                  height="30"
                  rx={5}
                  fill="black"
                  opacity="0.5" />
                <TextSVG
                  x={tooltipPos.x + 5}
                  y={tooltipPos.y + 30}
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle">
                  {tooltipPos.value.toFixed(2)}
                </TextSVG>
              </Svg>
            </View> : null
          }}

          onDataPointClick={(data) => {

            // check if we have clicked on the same point again
            let isSamePoint = (tooltipPos.x === data.x
              && tooltipPos.y === data.y)

            // if clicked on the same point again toggle visibility
            // else,render tooltip to new position and update its value
            isSamePoint ? setTooltipPos((previousState) => {
              return {
                ...previousState,
                value: data.value,
                visible: !previousState.visible
              }
            })
              :
              setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

          }}
        />
      </DashboardCard>

      {/* [MyDashboard] Bar Chart for # of Subjects vs Grade */}
      <DashboardCard>

        <Text style={styles.chartTitle}># of Subjects vs Grade</Text>
        <ScrollView horizontal={true}>
          <BarChart
            data={{
              labels: GradeFreqlabels,
              datasets: [{
                data: GradeFreqdata
              }]
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            fromZero={true}
            showValuesOnTopOfBars={true}

            chartConfig={{
              backgroundColor: '#B6D0E2',
              backgroundGradientFrom: '#B6D0E2',
              backgroundGradientTo: '#B6D0E2',
              fillShadowGradient: 'black',
              fillShadowGradientOpacity: 1,
              barPercentage: 0.5,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,

              },


            }}
            bezier
            style={{
              marginTop: 15,
              marginRight: 10,
              borderRadius: 0
            }}

          />
        </ScrollView>
      </DashboardCard>

      <View style={styles.cardInner}>
        <DashboardCard>
          <Text style={styles.cardText}>{listOfSubjects[0]}</Text>
          <Text style={styles.cardSubtext}>Best Subject</Text>
        </DashboardCard>
      </View>

      <View style={styles.cardInner}>
        <DashboardCard>
          <Text style={styles.cardText}>{listOfSubjects.length}</Text>
          <Text style={styles.cardSubtext}>Total Subjects</Text>
        </DashboardCard>
      </View>

      <View style={styles.cardInner}>
        <DashboardCard>
          <Text style={styles.cardText}>{listOfSubjects[listOfSubjects.length-1]}</Text>
          <Text style={styles.cardSubtext}>Worst Subject</Text>
        </DashboardCard>
      </View>

      <View style={styles.tableHeader}>
        {
          columns.map((column, index) => {
            {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.columnHeader}
                  onPress={() => sortTable(column)}>
                  <Text style={styles.columnHeaderTxt}>
                    {cosmeticColumns[index] + " "}
                    {selectedColumn === column && <MaterialCommunityIcons
                      name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                    />
                    }
                  </Text>
                </TouchableOpacity>
              )
            }
          })
        }
      </View>

    </View>
  )

  const renderTable = ({ item, index }) => {
    return (
      <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
        <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.Semester}</Text>
        <Text style={styles.columnRowTxt}>{item.CourseCode}</Text>
        <Text style={styles.columnRowTxt} adjustsFontSizeToFit numberOfLines={3}>{item.Subject}</Text>
        <Text style={styles.columnRowTxt}>{item.Grades}</Text>
        <Text style={styles.columnRowTxt}>{item.CreditHours}</Text>
        <Text style={styles.columnRowTxt}>{item.GradePoints}</Text>

      </View>
    )
  }

  const renderFooter = () => (
    <View>

    </View>
  )


  const renderGradePoints = results.map(resultSum => resultSum.GradePoints).reduce((a, b) => a + b)
  const totalCreditHours = results.reduce((a, b) => a + (b.CreditHours || 0), 0)
  const cummulativeGPA = renderGradePoints / totalCreditHours
  const SGPAdata = semesterGPA.map(key => key.GPA)
  const SGPAlabels = semesterGPA.map(key => key.Semester)

  const countGradeFreq = _.countBy(results.map(key => key.Grades))
  const GradeFreqdata = _.values(countGradeFreq)
  const GradeFreqlabels = _.keys(countGradeFreq)

  const listOfSubjects = results.map(key => key.CourseCode)





  return (

    // console.log(Object.keys(results)), just to see the array of keys 
    // console.log(renderGradePoints2), this one is working
    console.log(renderGradePoints.toFixed(2)), // working. used for the card "Total Grade Points"
    console.log(totalCreditHours.toFixed(0)), // working. used for the card "Total Credit Hours"
    console.log(cummulativeGPA.toFixed(2)), // working. used for the card "CGPA"

    // testing working value to be inserted into line chart data
    // console.log(semesterGPA[0].GPA), // returns one value but not in const
    // console.log(Object.keys(semesterGPA).map(key => semesterGPA[key])), // doesn't work, returns array of objects
    console.log(semesterGPA.map(key => key.GPA)), // returns array value so this is most ideal, but not in const "GPABySem". solution is to put this directly into linechart data={{}} instead

    // testing working value to be inserted into bar chart data
    console.log(results.map(key => key.Grades)), // returns sorted array of available grades. prob usable for bar chart labels
    console.log(_.keys(countGradeFreq)), // _.keys(array), returns in array all the key (unique values) of array. working. used.
    console.log(_.values(countGradeFreq)), // _.values(array), returns in array all the key freq of array+. working. used.

    // testing working value to be inserted into cards before table
    console.log(listOfSubjects[0]), // return the first value of a descending order array. working. used for the card "Best Subject"
    console.log(listOfSubjects.length), // return length of array. working. used for the card "Total Subjects"
    console.log(listOfSubjects[listOfSubjects.length-1]), // return the last value of a descending order array. working. used for the card "Worst Subject"

    <View style={globalStyles.container}>

      <Header text='My Dashboard' />
      <View style={styles.cardContainer}>
        <FlatList
          data={results}
          style={{ maxHeight: Dimensions.get('window').height - 100, width: "90%" }}
          horizontal={false}
          keyExtractor={(item, index) => index + ""}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          // stickyHeaderIndices={[0]}
          renderItem={renderTable}
        />
        <StatusBar style="auto" />
      </View>

    </View >
  );


}


const styles = StyleSheet.create({
  filterInner: {
    width: Dimensions.get('window').width / 2,
    padding: -2,
    margin: -2,
  },
  filterText: {
    fontFamily: 'nunito-bold',
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'center',
    color: "black",
    flex: 1,
  },

  cardInner: {
    width: Dimensions.get('window').width / 3,
    padding: -1,
    margin: -1,
  },
  cardContainer: {
    width: Dimensions.get('window').width,
    padding: 1,
    margin: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardText: {
    fontFamily: 'nunito-bold',
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
    color: "black",
  },
  cardSubtext: {
    fontFamily: 'nunito-regular',
    fontWeight: '900',
    fontSize: 12,
    textAlign: 'center',
    color: "black",
  },

  chartTitle: {
    fontFamily: 'nunito-bold',
    fontWeight: '900',
    fontSize: 24,
    textAlign: 'center',
    color: "black",
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#7faccc",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    width: Dimensions.get('window').width - 12,
    marginTop: 5,
    marginLeft: 2,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    margin: 1,
    marginLeft: 1.5,
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "20 %",
    justifyContent: "center",
    alignItems: "center"
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "16.5%",
    textAlign: "center",
    flexWrap: 'wrap',
    flex: 1,
  }
});

const image = require("../../assets/registerPage/backgroundLogin.png");