import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
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
import _, { isNull, xorBy } from "lodash";
import { StatusBar } from 'expo-status-bar';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";


//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function myDashboard({ navigation }) {
  const { user, Logout, profile } = useContext(AuthContext);
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })



  // all here is for filter category (filter semester, grades, graph)
  // const [selectedCategoryId, setSelectedCategoryId] = React.useState(1)
  // const [selectedMenuType, setSelectedMenuType] = React.useState(1)
  // const [menuList, setMenuList] = React.useState([])

  // React.useEffect(() => {
  //   handleChangeCategory(selectedCategoryId, selectedMenuType)
  // }, [])

  // // Handler

  // function handleChangeCategory(semId, menuTypeId) {
  //   // Find the menu based on the menuTypeId
  //   let selectedSem = dummyData.menu.find(a => a.id == menuTypeId)

  //   // Set the menu based on the categoryId
  //   setMenuList(selectedSem?.list.filter(a => a.results.
  //     includes(semId)))

  // }

  // <TouchableOpacity onPress={() => {
  //   setSelectedMenuType(item.id)
  //   handleChangeCategory(selectedCategoryId, item.id)
  // }}>

  // </TouchableOpacity>

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

  const [sgpa, setSGPA] = useState([
    {
      Semester: 1,
      Label: "Sem 1",
      GPA: 3.74
    },
    {
      Semester: 2,
      Label: "Sem 2",
      GPA: 2.69
    }
  ])

  const [results, setResults] = useState([
    {
      Semester: 1,
      CourseCode: "GIG1001",
      Subject: "THE ISLAMIC AND ASIAN CIVILIZATION",
      Grades: "A+",
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

  const Semester = [
    {
      id: 1,
      item: "Sem 1",
      GPA: 3.74
    },
    {
      id: 2,
      item: "Sem 2",
      GPA: 2.69
    }
  ]

  const [direction, setDirection] = useState(null)

  const [selectedColumn, setSelectedColumn] = useState(null)

  const [sem, setSem] = useState(null);
  const [resultsList, setResultsList] = useState(results)
  const [resultsTable, setResultsTable] = useState(results)
  const [sgpaList, setSGPAList] = useState(sgpa)

  const listTab = sgpa.map(key => _.pick(key, ['Semester']))
  // will return a similar format to listTab dalam GPA.js

  const [graphStatus, setGraphStatus] = useState(false);
  const [cards, setCards] = useState(false);
  const toggleCards = () => {
    setCards(!cards);
  };

  const [barChart, setBarChart] = useState(false);
  const toggleBarChart = () => {
    setBarChart(!barChart);
  };

  const [lineChart, setLineChart] = useState(false);
  const toggleLineChart = () => {
    setLineChart(!lineChart);
  };

  const [table, setTable] = useState(false);
  const toggleTable = () => {
    setTable(!table);
  };

  const listTab2 = [
    {
      Graph: "Line Chart"
    },
    {
      Graph: "Bar Chart"
    },
    {
      Graph: "Cards"
    },
    {
      Graph: "Table"
    },
  ]

  const gradeRank = {
    'A+': 1,
    'A': 2,
    'A-': 3,
    'B+': 4,
    'B': 5,
    'B-': 6,
    'C+': 7,
    'C': 8,
    'C-': 9,
    'D+': 10,
    'D': 11,
    'F': 12
  }

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc"
    const sortedData1 = _.orderBy(resultsTable, [column], [newDirection])
    const sortedData2 = _.orderBy(resultsTable, function (obj) {
      return gradeRank[obj.Grades]
    }, [newDirection])
    
    setSelectedColumn(column)
    setDirection(newDirection)
    if (column === "Grades") {
      setResultsTable(sortedData2)
    }
    else {
      setResultsTable(sortedData1)
    }
  }

  const setStatusFilter = Semester => {
    setResultsList([...results.filter(e => e.Semester === Semester)]);
    setResultsTable([...results.filter(e => e.Semester === Semester)]);
    setSGPAList([...sgpa.filter(e => e.Semester === Semester)]);
    setSem(Semester)
  }

  const resetStatusFilter = () => {
    setResultsList(results);
    setResultsTable(results);
    setSGPAList(sgpa);
    setSem(null)
  }

  const setGraphFilter = Graph => {
    if (Graph === "Cards") {
      toggleCards();
    }
    if (Graph === "Bar Chart") {
      toggleBarChart();
    }
    if (Graph === "Line Chart") {
      toggleLineChart();
    }
    if (Graph === "Table") {
      toggleTable();
    }
    setGraphStatus(true)
  }

  const resetGraphFilter = () => {
    setCards(false);
    setBarChart(false);
    setLineChart(false);
    setTable(false);
    setGraphStatus(false)
  }

  const renderHeader = () => (

    <View style={styles.cardContainer}>

      {/* [MyDashboard] Filter */}
      {/* For "Select Semester", single-select dropdown list with values "All Semester", "Semester 1", "Semester 2", and so on */}
      {/* For "Filter Graph", multiselect dropdown list with values "Remove Bar Chart", "Remove First 3 Cards", "Remove Last 3 Cards", and so on */}


      {/* [MyDashboard] Select Semester Filter */}
      <View>
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.listTab}>
            <View style={styles.listIcon}>
              <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} />
            </View>


            {/* For when you wake up later, */}
            {/* Sini letak butang untuk reset filter, use resetStatusFilter() */}
            {/* Default value */}
            <TouchableOpacity
              style={[
                styles.btnTabActive,
                {
                  width: Dimensions.get('window').width / listTab.length - 50,
                  // maxWidth: Dimensions.get('window').width / 3.5
                },
                sem !== null && styles.btnTab
              ]}
              onPress={() => resetStatusFilter()}
            >

              {/* By default, active tab style, if unselected, normal tab style */}
              <Text style={[styles.textTabActive, sem !== null && styles.textTab]}>
                All Semesters
              </Text>

              {/* By default, display icon */}
              {sem !== null ?
                <View></View>
                :
                <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
              }

              {/* Filtered value */}
            </TouchableOpacity>
            {
              listTab.map((e, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.btnTab,
                    {
                      width: Dimensions.get('window').width / listTab.length - 100,
                      // maxWidth: Dimensions.get('window').width / 3.5
                    },
                    sem === e.Semester && styles.btnTabActive]}
                  onPress={() => setStatusFilter(e.Semester)}
                >

                  {/* If unselected, normal tab style, if selected, active tab style */}
                  <Text style={[styles.textTab, sem === e.Semester && styles.textTabActive]}>
                    Sem {e.Semester}
                  </Text>

                  {/* If selected, display icon */}
                  {sem === e.Semester ?
                    <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                    :
                    <View></View>}
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </View>

      {/* [MyDashboard] Remove Graph Filter */}
      <View>
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.listTab}>
            <View style={styles.listIcon}>
              <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} />
            </View>

            {/* For when you wake up later, */}
            {/* Sini letak butang untuk reset filter, use resetGraphFilter() */}
            {/* Default value */}
            <TouchableOpacity
              style={[
                styles.btnTabActive,
                {
                  width: Dimensions.get('window').width / listTab2.length + 30,
                  // maxWidth: Dimensions.get('window').width / 3
                },
                graphStatus === true && styles.btnTab
              ]}
              onPress={() => resetGraphFilter()}
            >

              {/* By default, active tab style, if unselected, normal tab style */}
              <Text style={[styles.textTabActive, graphStatus === true && styles.textTab]}>
                All Graphs
              </Text>

              {/* By default, display icon */}
              {graphStatus === true ?
                <View></View>
                :
                <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
              }

              {/* Filtered value */}
            </TouchableOpacity>
            {
              listTab2.map((e, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.btnTab,
                    {
                      width: Dimensions.get('window').width / listTab2.length + 25,
                      // maxWidth: Dimensions.get('window').width / 3.5
                    },
                    (e.Graph === "Cards" && cards === true) && styles.btnTabActive,
                    (e.Graph === "Bar Chart" && barChart === true) && styles.btnTabActive,
                    (e.Graph === "Line Chart" && lineChart === true) && styles.btnTabActive,
                    (e.Graph === "Table" && table === true) && styles.btnTabActive]}
                  onPress={() => setGraphFilter(e.Graph)}
                >

                  {/* If unselected, normal tab style, if selected, active tab style */}
                  <Text style={[styles.textTab,
                  (e.Graph === "Cards" && cards === true) && styles.textTabActive,
                  (e.Graph === "Bar Chart" && barChart === true) && styles.textTabActive,
                  (e.Graph === "Line Chart" && lineChart === true) && styles.textTabActive,
                  (e.Graph === "Table" && table === true) && styles.textTabActive]}>
                    {e.Graph}
                  </Text>

                  {/* If selected, display icon */}
                  {(e.Graph === "Cards" && cards === true)
                    || (e.Graph === "Bar Chart" && barChart === true)
                    || (e.Graph === "Line Chart" && lineChart === true)
                    || (e.Graph === "Table" && table === true) ?
                    <Ionicons name="close-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                    :
                    <View></View>}
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </View>

      {/* 

      <View style={styles.filterInner}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: "5%",
        }}>
          <SelectDropdown
            data={Semester}
            // defaultValueByIndex={1} // use default value by index or default value
            // defaultValue={'Canada'} // use default value by index or default value
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.item;
            }}
            rowTextForSelection={(item, index) => {
              return item.item;
            }}
            defaultButtonText={"Select Semester"}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
      </View>

      <View style={styles.filterInner}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: "5%",
        }}>
          <SelectDropdown
            data={Semester}
            // defaultValueByIndex={1} // use default value by index or default value
            // defaultValue={'Canada'} // use default value by index or default value
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.item;
            }}
            rowTextForSelection={(item, index) => {
              return item.item;
            }}
            defaultButtonText={"Filter Graphs"}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#FFF"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
      </View> */}

      {/* [MyDashboard] Card for Total Credit Hours, CGPA, Total Grade Points */}
      {console.log(graphStatus)}
      {(cards === true || graphStatus === false) ?
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.cardInner}>
            <DashboardCard>
              <Text style={styles.cardText}>{totalCreditHours.toFixed(0)}</Text>
              <Text style={styles.cardSubtext}>Total Credit Hours</Text>
            </DashboardCard>
          </View>

          <View style={styles.cardInner}>
            <DashboardCard>
              <Text style={styles.cardText}>{cummulativeGPA.toFixed(2)}</Text>
              {sem === null ?
                <Text style={styles.cardSubtext}>CGPA</Text>
                :
                <Text style={styles.cardSubtext}>GPA</Text>
              }

            </DashboardCard>
          </View>

          <View style={styles.cardInner}>
            <DashboardCard>
              <Text style={styles.cardText}>{renderGradePoints.toFixed(2)}</Text>
              <Text style={styles.cardSubtext}>Total Grade Points</Text>
            </DashboardCard>
          </View>
        </View>
        : <View></View>
      }



      {/* [MyDashboard] Line Chart for GPA vs Semester */}
      {((lineChart === true || graphStatus === false) && sem === null) ?
        <DashboardCard>
          <Text style={styles.chartTitle}>GPA vs Semester</Text>
          <LineChart
            data={{
              labels: SGPAlabels,
              datasets: [
                {
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
        :
        <View></View>}



      {/* [MyDashboard] Bar Chart for # of Subjects vs Grade */}
      {(barChart === true || graphStatus === false) ?

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
        :
        <View></View>}

      {/* [myDashboard] Cards for Best Subject, Total Subjects and Worst Subject */}
      {(cards === true || graphStatus === false) ?
        <View style={{ flexDirection: 'row' }}>
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
              <Text style={styles.cardText}>{listOfSubjects[listOfSubjects.length - 1]}</Text>
              <Text style={styles.cardSubtext}>Worst Subject</Text>
            </DashboardCard>
          </View>
        </View>
        :
        <View></View>}


      {/* [myDashboard] Table headers for list of subjects */}
      {(table === true || graphStatus === false) ?
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
        :
        <View></View>}


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


  const renderGradePoints = resultsList.map(resultSum => resultSum.GradePoints).reduce((a, b) => a + b)
  const totalCreditHours = resultsList.reduce((a, b) => a + (b.CreditHours || 0), 0)
  const cummulativeGPA = renderGradePoints / totalCreditHours
  const SGPAdata = sgpaList.map(key => key.GPA)
  const SGPAlabels = sgpaList.map(key => key.Label)

  const sortedResultsList = _.sortBy(resultsList, e => gradeRank[e.Grades], ['asc'])
  const countGradeFreq = _.countBy(sortedResultsList.map(key => key.Grades))
  const GradeFreqdata = _.values(countGradeFreq)
  const GradeFreqlabels = _.keys(countGradeFreq)

  const listOfSubjects = resultsList.map(key => key.CourseCode)



  return (

    // console.log(Object.keys(results)), just to see the array of keys 
    // console.log(renderGradePoints2), this one is working
    console.log(renderGradePoints.toFixed(2)), // working. used for the card "Total Grade Points"
    console.log(totalCreditHours.toFixed(0)), // working. used for the card "Total Credit Hours"
    console.log(cummulativeGPA.toFixed(2)), // working. used for the card "CGPA"

    // testing working value to be inserted into line chart data
    // console.log(Semester[0].GPA), // returns one value but not in const
    // console.log(Object.keys(Semester).map(key => Semester[key])), // doesn't work, returns array of objects
    console.log(Semester.map(key => key.GPA)), // returns array value so this is most ideal, but not in const "GPABySem". solution is to put this directly into linechart data={{}} instead

    // testing working value to be inserted into bar chart data
    console.log(results.map(key => key.Grades)), // returns sorted array of available grades. prob usable for bar chart labels
    console.log(listTab),

    console.log(_.keys(countGradeFreq)), // _.keys(array), returns in array all the key (unique values) of array. working. used.
    console.log(_.values(countGradeFreq)), // _.values(array), returns in array all the key freq of array+. working. used.

    // testing working value to be inserted into cards before table
    console.log(listOfSubjects[0]), // return the first value of a descending order array. working. used for the card "Best Subject"
    console.log(listOfSubjects.length), // return length of array. working. used for the card "Total Subjects"
    console.log(listOfSubjects[listOfSubjects.length - 1]), // return the last value of a descending order array. working. used for the card "Worst Subject"

    <View style={globalStyles.container, { height: Dimensions.get('window').height } + 100}>

      <Header text='My Dashboard' />

      <View style={styles.cardContainer}>
        <FlatList
          data={resultsTable}
          style={{ maxHeight: Dimensions.get('window').height - 100, width: "90%" }}
          horizontal={false}
          keyExtractor={(item, index) => index + ""}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          // stickyHeaderIndices={[0]}
          // if table selected or 'all graphs' selected, render table
          renderItem={(table === true || graphStatus === false) && renderTable}
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


  saveAreaViewContainer: { flex: 1, backgroundColor: "#000", },
  viewContainer: { flex: 1, width: Dimensions.get('window').width, backgroundColor: "#FFF" },
  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

  dropdown2BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: { backgroundColor: "#444" },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },



  listTab: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  listIcon: {
    marginLeft: 20,
    marginHorizontal: 10,
  },
  btnTab: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#444',
    padding: 10,
    borderRadius: 20,
    margin: 5,
    height: 45,
  },
  textTab: {
    fontFamily: 'nunito-regular',
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'center',
    color: "black",
    flex: 1,

  },
  btnTabActive: {
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#444',
    padding: 10,
    borderRadius: 20,
    margin: 5,
    height: 45,
  },
  textTabActive: {
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