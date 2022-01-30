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
import _, { isUndefined } from "lodash";
import { StatusBar } from 'expo-status-bar';
import { VictoryPie, VictoryLegend } from 'victory-native';

//check if firebase not init,so init from config file
if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

const db = firebase.firestore();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function groupDashboard({ navigation }) {
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
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
        datasets: [
            {

                data: [4.00, 2.89, 3.75, 3.94, 4.00],
                strokeWidth: 3, // optional
            },
        ],
    };



    const groupData = [
        {
            GroupID: 1,
            GroupName: "WIX3003",
        },
        {
            GroupID: 2,
            GroupName: "IS Students",
        },
        {
            GroupID: 3,
            GroupName: "3rd Year Students"
        }
    ]



    // GPA = totalGradePoints / totalCreditHours for one sem
    // CGPA = totalGradePoints / totalCreditHours for all sem
    // Semester, Course Code, Subject, Grades, Credit Hours, Grade Points

    // const totalGradePoints = results.map(resultSum => resultSum.GradePoints).reduce((a, b) => a + b)
    // const totalCreditHours = results.map(resultSum => resultSum.CreditHours).reduce((a, b) => a + b)

    let results = []

    let studentsData = [
        {
            StudentID: 1,
            GroupID: [1, 2, 3],
            StudentName: "Afifah",
            Gender: "Female",
            Department: "Information Systems",
            CGPA: 3.17,
            SGPA: [
                {
                    Semester: 1,
                    GPA: 3.74,
                },
                {
                    Semester: 2,
                    GPA: 2.76,
                }
            ],
            results: [
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
                    Subject: "INFORMATION SYSTEMS",
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
                    Subject: "ETHNIC RELATIONS",
                    Grades: "A",
                    CreditHours: 2,
                    GradePoints: 8
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
                }],
        },
        {
            StudentID: 2,
            GroupID: [1, 2],
            StudentName: "Nat",
            Gender: "Female",
            Department: "Information Systems",
            CGPA: 3.75,
            SGPA: [
                {
                    Semester: 1,
                    GPA: 3.74,
                },
                {
                    Semester: 2,
                    GPA: 2.76,
                }
            ],
            results: [
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
                    Subject: "INFORMATION SYSTEMS",
                    Grades: "A-",
                    CreditHours: 3,
                    GradePoints: 11.1
                },
                {
                    Semester: 1,
                    CourseCode: "WIX1001",
                    Subject: "COMPUTING MATHEMATICS I",
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12
                },
                {
                    Semester: 1,
                    CourseCode: "WIX1002",
                    Subject: "FUNDAMENTALS OF PROGRAMMING",
                    Grades: "A",
                    CreditHours: 5,
                    GradePoints: 20
                },
                {
                    Semester: 1,
                    CourseCode: "WIX1003",
                    Subject: "COMPUTER SYSTEMS AND ORGANIZATION",
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12
                },
                {
                    Semester: 2,
                    CourseCode: "GIG1002",
                    Subject: "ETHNIC RELATIONS",
                    Grades: "A",
                    CreditHours: 2,
                    GradePoints: 8
                },
                {
                    Semester: 2,
                    CourseCode: "GIG1005",
                    Subject: "SOCIAL ENGAGEMENT",
                    Grades: "A+",
                    CreditHours: 2,
                    GradePoints: 8
                },
                {
                    Semester: 2,
                    CourseCode: "WIA1002",
                    Subject: "DATA STRUCTURE",
                    Grades: "B-",
                    CreditHours: 5,
                    GradePoints: 13.5
                },
                {
                    Semester: 2,
                    CourseCode: "WIA1003",
                    Subject: "COMPUTER SYSTEM ARCHITECTURE",
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12,
                },
                {
                    Semester: 2,
                    CourseCode: "WIA1004",
                    Subject: "FUNDAMENTALS OF ARTIFICIAL INTELLIGENCE",
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12
                },
                {
                    Semester: 2,
                    CourseCode: "WIA1005",
                    Subject: "NETWORK TECHNOLOGY FOUNDATION",
                    Grades: "A-",
                    CreditHours: 4,
                    GradePoints: 14.8
                }],
        },
        {
            StudentID: 3,
            GroupID: [1, 3],
            StudentName: "Zak",
            Gender: "Male",
            Department: "Software Engineering",
            CGPA: 3.82,
            SGPA: [
                {
                    Semester: 1,
                    GPA: 3.88,
                },
                {
                    Semester: 2,
                    GPA: 3.76,
                }
            ],
            results: [
                {
                    Semester: 1,
                    CourseCode: "WIA1005",
                    Subject: "NETWORK TECHNOLOGY FOUNDATION",
                    Grades: "A",
                    CreditHours: 4,
                    GradePoints: 16.00
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
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12.0
                },
                {
                    Semester: 1,
                    CourseCode: "WIX1002",
                    Subject: "FUNDAMENTALS OF PROGRAMMING",
                    Grades: "A+",
                    CreditHours: 5,
                    GradePoints: 20.0
                },
                {
                    Semester: 1,
                    CourseCode: "WIX1003",
                    Subject: "COMPUTER SYSTEMS AND ORGANIZATION",
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12.0
                },
                {
                    Semester: 2,
                    CourseCode: "GIG1001",
                    Subject: "THE ISLAMIC AND ASIAN CIVILIZATION",
                    Grades: "A",
                    CreditHours: 2,
                    GradePoints: 8
                },
                {
                    Semester: 2,
                    CourseCode: "GIG1002",
                    Subject: "ETHNIC RELATIONS",
                    Grades: "A+",
                    CreditHours: 2,
                    GradePoints: 8
                },
                {
                    Semester: 2,
                    CourseCode: "GIG1004",
                    Subject: "INFORMATION LITERACY",
                    Grades: "A",
                    CreditHours: 2,
                    GradePoints: 8
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
                    Grades: "A-",
                    CreditHours: 5,
                    GradePoints: 18.5
                },
                {
                    Semester: 2,
                    CourseCode: "WIA1003",
                    Subject: "COMPUTER SYSTEM ARCHITECTURE",
                    Grades: "B",
                    CreditHours: 3,
                    GradePoints: 9,
                },
                {
                    Semester: 2,
                    CourseCode: "WIA1004",
                    Subject: "FUNDAMENTALS OF ARTIFICIAL INTELLIGENCE",
                    Grades: "A",
                    CreditHours: 3,
                    GradePoints: 12
                },
            ],
        },

    ]

    let studentsDataTable = [
        {
            Semester: 1,
            CourseCode: "GIG1001",
            Subject: "THE ISLAMIC AND ASIAN CIVILIZATION",
            CreditHours: 2,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 1,
            CourseCode: "WIA1001",
            Subject: "INFORMATION SYSTEMS",
            CreditHours: 3,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 1,
            CourseCode: "WIX1001",
            Subject: "COMPUTING MATHEMATICS I",
            CreditHours: 3,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 1,
            CourseCode: "WIX1002",
            Subject: "FUNDAMENTALS OF PROGRAMMING",
            CreditHours: 5,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 1,
            CourseCode: "WIX1003",
            Subject: "COMPUTER SYSTEMS AND ORGANIZATION",
            CreditHours: 3,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 2,
            CourseCode: "GIG1002",
            Subject: "ETHNIC RELATIONS",
            CreditHours: 2,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 2,
            CourseCode: "GIG1005",
            Subject: "SOCIAL ENGAGEMENT",
            CreditHours: 2,
            Passed: 18,
            Failed: 0
        },
        {
            Semester: 2,
            CourseCode: "WIA1002",
            Subject: "DATA STRUCTURE",
            CreditHours: 5,
            Passed: 3,
            Failed: 15
        },
        {
            Semester: 2,
            CourseCode: "WIA1003",
            Subject: "COMPUTER SYSTEM ARCHITECTURE",
            CreditHours: 3,
            Passed: 15,
            Failed: 3
        },
        {
            Semester: 2,
            CourseCode: "WIA1004",
            Subject: "FUNDAMENTALS OF ARTIFICIAL INTELLIGENCE",
            CreditHours: 3,
            Passed: 17,
            Failed: 1
        },
        {
            Semester: 2,
            CourseCode: "WIA1005",
            Subject: "NETWORK TECHNOLOGY FOUNDATION",
            CreditHours: 4,
            Passed: 18,
            Failed: 0
        }
    ]



    const [columns, setColumns] = useState([
        "Semester",
        "CourseCode",
        "Subject",
        "CreditHours",
        "Passed",
        "Failed"
    ])
    const [cosmeticColumns, setCosmeticColumns] = useState([
        "Sem",
        "Course\nCode",
        "Subject",
        "Credit\nHours",
        "Passed",
        "Failed"
    ])
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [studentsTable, setStudentsTable] = useState(studentsDataTable)
    const [students, setStudents] = useState(studentsData)

    function setSelectColumnByName(name) {
        let column = students.filter(a => a.name == name)
        setSelectedColumn(column[0])
    }

    function processCategoryDataToDisplay() {
        var cgpacat = ''
        let chartData = students.map((item) => {
            var totalGradePoints = (item.results.reduce((a, b) => a + (b.GradePoints || 0), 0)).toFixed(0)
            var totalCreditHours = item.results.reduce((a, b) => a + (b.CreditHours || 0), 0)
            var cumulativeGPA = (totalGradePoints / totalCreditHours).toFixed(2)

            // console.log("Testing")
            // console.log(totalGradePoints)
            // console.log(totalCreditHours)
            // console.log(cumulativeGPA)

            if (cumulativeGPA >= 3.70) { cgpacat = "3.70 - 4.00" }
            else if (cumulativeGPA >= 3.30 && cumulativeGPA <= 3.69) { cgpacat = "3.30 - 3.69" }
            else if (cumulativeGPA >= 2.70 && cumulativeGPA <= 3.29) { cgpacat = "2.70 - 3.29" }
            else if (cumulativeGPA >= 2.00 && cumulativeGPA <= 2.69) { cgpacat = "2.00 - 2.69" }
            else if (cumulativeGPA >= 0.00 && cumulativeGPA <= 1.99) { cgpacat = "0.00 - 1.99" }

            return {
                name: item.StudentName,
                gender: item.Gender,
                department: item.Department,
                totalsem: item.TotalSemester,
                totalgp: totalGradePoints,
                totalch: totalCreditHours,
                cgpa: cumulativeGPA,
                category: cgpacat
            }
        })

        let pieData = [
            { x: "0.00 - 1.99", y: '' },
            { x: "2.00 - 2.69", y: '' },
            { x: "2.70 - 3.29", y: '' },
            { x: "3.30 - 3.69", y: '' },
            { x: "3.70 - 4.00", y: '' },
        ]

        var numOfStudents = chartData.length
        // console.log("Testing lagi")
        // console.log(numOfStudents)

        let finalChartData = chartData.map((item) => {
            var numOfCategory = chartData.filter(a => a.category === item.category).length
            let percentage = (numOfCategory / numOfStudents * 100).toFixed(0)
            return {
                y: `${percentage}%`,
                count: numOfCategory,
                label: item.category
            }
        })

        return finalChartData
    }

    const renderPieChart = () => {
        let chartData = processCategoryDataToDisplay()
        let totalStudentCount = chartData.reduce((a, b) => a + (b.count || 0), 0)
        // console.log("Check Chart")
        // console.log(chartData)

        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <Svg width={Dimensions.get('window').width - 42}
                    height={Dimensions.get('window').width - 22}
                    style={{ width: "100%" }}>
                    <Text style={styles.chartTitle}># of Students by CGPA Range</Text>

                    <VictoryPie
                        standalone={false} // Android workaround
                        data={[
                            { x: "0.00 - 1.99", y: 2 },
                            { x: "2.00 - 2.69", y: 8 },
                            { x: "2.70 - 3.29", y: 5 },
                            { x: "3.30 - 3.69", y: 2 },
                            { x: "3.70 - 4.00", y: 1 },
                        ]}
                        labels={({ datum }) => datum.y}
                        // radius={({ datum }) => (selectedColumn && selectedColumn.name == datum.name) ? Dimensions.get('window').width * 0.4 : Dimensions.get('window').width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => ((Dimensions.get('window').width - 42) * 0.45 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "black", ...styles.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={Dimensions.get('window').width - 42}
                        height={Dimensions.get('window').width - 42}
                        colorScale="blue"
                    // events={[{
                    //     target: "data",
                    //     eventHandlers: {
                    //         onPress: () => {
                    //             return [{
                    //                 target: "labels",
                    //                 mutation: (props) => {
                    //                     let columnName = chartData[props.index].y
                    //                     setSelectColumnByName(columnName)
                    //                 }
                    //             }]
                    //         }
                    //     }
                    // }]}



                    />
                    <VictoryLegend x={60} y={335}
                        height={Dimensions.get('window').width - 22}
                        borderPadding={{ top: 7, bottom: 5, left: 10 }}
                        orientation="horizontal"
                        gutter={25}
                        itemsPerRow={3}
                        style={{
                            border: { stroke: "black" },
                            labels: { fontSize: 9, fontFamily: 'nunito-bold' },
                        }}
                        colorScale="blue"
                        data={[
                            { name: "0.00 - 1.99" },
                            { name: "2.00 - 2.69" },
                            { name: "2.70 - 3.29" },
                            { name: "3.30 - 3.69" },
                            { name: "3.70 - 4.00" },
                        ]}
                    />
                </Svg>
                <View style={{ position: 'absolute', top: '39%', left: "36%" }}>
                    <Text style={{ ...styles.h1, textAlign: 'center' }}>18</Text>
                    <Text style={{ ...styles.body3, textAlign: 'center' }}>Total Students</Text>
                </View>
            </View>
        )
    }

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(studentsTable, [column], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setStudentsTable(sortedData)
    }

    const renderHeader = () => (
        <View style={styles.cardContainer}>
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
                        <Text style={styles.filterText}>Select Group</Text>
                        <Ionicons name="arrow-down" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                    </View></Card>
            </View>

            <View style={styles.filterInner}>
                <Card>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.filterText}>Filter by Gender</Text>
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
                        <Text style={styles.filterText}>Filter by Dept.</Text>
                        <Ionicons name="arrow-down" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                    </View></Card>
            </View>

            <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                <View style={styles.cardInner}>
                    <DashboardCard>
                        <Text style={styles.cardText}>{numOfStudents}</Text>
                        <Text style={styles.cardSubtext}>Total Students</Text>
                    </DashboardCard>
                </View>

                <View style={styles.cardInner}>
                    <DashboardCard>
                        <Text style={styles.cardText}>3.21</Text>
                        <Text style={styles.cardSubtext}>Average CGPA</Text>
                    </DashboardCard>
                </View>

                <View style={styles.cardInner}>
                    <DashboardCard>
                        <Text style={styles.cardText}>326.90</Text>
                        <Text style={styles.cardSubtext}>Avg. Grade Points</Text>
                    </DashboardCard>
                </View>
            </View>

            <DashboardCard>
                <Text style={styles.chartTitle}>Average GPA vs Semester</Text>
                <LineChart
                    data={GPAbySem}
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

            <Card>
                {renderPieChart()}
            </Card>

            <DashboardCard>

                <Text style={styles.chartTitle}># of Subjects vs Grade</Text>
                <BarChart
                    data={SubjectbyGrade}
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
            </DashboardCard>

            <View style={styles.cardInner}>
                <DashboardCard>
                    <Text style={styles.cardText}>WIE2002</Text>
                    <Text style={styles.cardSubtext}>Top Subject</Text>
                </DashboardCard>
            </View>

            <View style={styles.cardInner}>
                <DashboardCard>
                    <Text style={styles.cardText}>32</Text>
                    <Text style={styles.cardSubtext}>Total Subjects</Text>
                </DashboardCard>
            </View>

            <View style={styles.cardInner}>
                <DashboardCard>
                    <Text style={styles.cardText}>WIA2005</Text>
                    <Text style={styles.cardSubtext}>Lowest Subject</Text>
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
                                    <Text style={styles.columnHeaderTxt}>{cosmeticColumns[index] + " "}
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
                <Text style={styles.columnRowTxt}>{item.CreditHours}</Text>
                <Text style={styles.columnRowTxt}>{item.Passed}</Text>
                <Text style={styles.columnRowTxt}>{item.Failed}</Text>

            </View>
        )
    }

    const renderFooter = () => (
        <View>

        </View>
    )

    // int, total number of students
    const numOfStudents = studentsData.length // this one is for card

    // array, total grade points of every student
    const renderGradePoints = studentsData.map(
        e => e.results.map(f => f.GradePoints).reduce((a, b) => a + b))
    const renderCreditHours = studentsData.map(
        e => e.results.map(f => f.CreditHours).reduce((a, b) => a + b))

    const renderCGPA = renderGradePoints.map((e, index) => e / renderCreditHours[index]) // this can be used for pie chart
    const totalStudentsCGPA = renderCGPA.map(e => e).reduce((a, b) => a + b)
    const averageCGPA = totalStudentsCGPA / numOfStudents // this one is for card

    // int, total grade points of all student
    const totalGradePoints = renderGradePoints.reduce((a, b) => a + b)
    const averageGradePoints = totalGradePoints / numOfStudents // this one is for card

    // average GPA for every sem, this one is for line chart
    const renderCountSemester = _.uniqBy(_.flatMap(studentsData, 'results'), 'Semester')
    const averageSGPAlabels = renderCountSemester.map(e => "Sem " + e.Semester) // use this for line chart
    // const resultsAllStudents = _.map(studentsData, 'results')  --- i gave up, just gonna input sgpa into every user
    const allStudentSGPA = studentsData.map(e => e.SGPA.map(f => f.GPA))
    const totalSGPA = allStudentSGPA.reduce((a, b) => a.map((c, i) => c + b[i]));
    const averageSGPAdata = totalSGPA.map(e => e / numOfStudents) // use this for line chart


    // this one is for bar chart
    const allSubject = _.flatMap(studentsData, 'results')
    const countGradeFreq = _.countBy(allSubject.map(key => key.Grades))
    const GradeFreqdata = _.values(countGradeFreq)
    const GradeFreqlabels = _.keys(countGradeFreq)

    // this one is for pie chart
    function renderCGPArange() {
        let arrayCGPArange = []
        let cgpacat = ''
        let val = {}
        let a = []
        renderCGPA.map(e => {
            if (e >= 3.70) { cgpacat = "3.70 - 4.00" }
            else if (e >= 3.30 && e <= 3.69) { cgpacat = "3.30 - 3.69" }
            else if (e >= 2.70 && e <= 3.29) { cgpacat = "2.70 - 3.29" }
            else if (e >= 2.00 && e <= 2.69) { cgpacat = "2.00 - 2.69" }
            else if (e >= 0.00 && e <= 1.99) { cgpacat = "0.00 - 1.99" }
            arrayCGPArange.push(cgpacat)
        })
        let countCGPArange = _.countBy(arrayCGPArange)
        let xVal = _.keys(countCGPArange)
        let yVal = _.values(countCGPArange)

        xVal.map((e, index) => {
            val = {
                x: xVal[index],
                y: yVal[index],
                label: xVal[index]
            }
            a.push(val)
        })

        return a
    }
    const CGPArangedata = renderCGPArange()

    // for table, column "highest grade" and "average grade"
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

    const gradeRank2 = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F']

    function compareRank(left, right){
        return gradeRank[left.Grades] - gradeRank[right.Grades]
    }

    function getSortedSubjectArray(course) {
        const subjectArray = studentsData.map(e => _.find(e.results, { CourseCode: course }))
        const sortedSubjectArray = subjectArray.sort(compareRank)
        // const sortedSubjectArray = _.sortBy(subjectArray, item => gradeRank.indexOf(item.name)) // cant do this w duplicates of grade
        // const sortedSubjectArray = _.map(gradeRank2, rankItem => _.find(subjectArray, item => item.Grades === rankItem));
        // const sortedSubjectArray = _.sortBy(subjectArray, e => gradeRank[e.Grades])
        // const sortedSubjectArray = _.orderBy(subjectArray, e => gradeRank[e.Grades], ['asc'])
        return sortedSubjectArray
    }

    const getHighestGrade = (course) => {
        const highestGrade = getSortedSubjectArray(course)[0].Grades
        return highestGrade
    }

    const getCommonGrade = (course) => {
        const commonGradeFreq = _.countBy(getSortedSubjectArray(course), "Grades")
        const commonGrade = _.maxBy(_.keys(commonGradeFreq), o => commonGradeFreq[o]);
        const uncommonGrade = _.minBy(_.keys(commonGradeFreq), o => commonGradeFreq[o]);
        if (commonGrade === "undefined") {
            return uncommonGrade
        }
        else {
            return commonGrade
        }
    }


    const subjectArray = studentsData.map(e => _.find(e.results, { CourseCode: "GIG1002" }))

    // const sortedSubjectArray = _.orderBy(subjectArray, function (obj) {
    //     return gradeRank[obj.Grades]
    // }, ['asc'])
    // const sortedSubjectArray = _.orderBy(subjectArray, o => gradeRank[o.Grades], ['asc'])
    // const highestSubject = _.maxBy(sortedSubjectArray, 'Grades')
    // const highestSubject = sortedSubjectArray[0].Grades

    // // for table, column "average grade"
    // const commonGradeFreq = _.countBy(sortedSubjectArray.map(key => key.Grades))
    // const commonGrade = _.maxBy(_.keys(commonGradeFreq), o => commonGradeFreq[o]);

    // for table, initial value
    const listOfSubjects = _.uniqBy(_.flatMap(studentsData, 'results'), 'CourseCode')
    const initialListOfSubjects = []
    listOfSubjects.map((e, index) => {
        const HGval = getHighestGrade(e.CourseCode)
        const CGval = getCommonGrade(e.CourseCode)

        const val = {
            Semester: e.Semester,
            CourseCode: e.CourseCode,
            Subject: e.Subject,
            CreditHours: e.CreditHours,
            // HighestGrade: '',
            // CommonGrade: '',
            HighestGrade: HGval,
            CommonGrade: CGval
        }
        initialListOfSubjects.push(val)
    })



    return (

        // console.log(Object.keys(students)),
        // console.log(students), 
        // console.log(studentsData.filter(a => a.StudentID === 1)),
        // console.log(studentsData.filter(a => a.GroupID.includes(2) === true)), //will be using for filter group

        // console.log(renderGradePoints),
        // console.log(renderCreditHours),
        // console.log(renderCGPA),

        // console.log(totalStudentsCGPA),
        // console.log(averageCGPA),
        // console.log(averageGradePoints),

        // line chart
        // console.log(allStudentSGPA),
        // console.log(totalSGPA),
        // console.log(averageSGPAlabels),
        // console.log(averageSGPAdata),

        // bar chart
        // console.log(_.flatMap(studentsData, 'results')),
        // console.log(countGradeFreq),

        // pie chart
        // console.log(CGPArangedata),

        // table initial value
        // console.log(listOfSubjects),
        console.log(initialListOfSubjects),
        // console.log(getSortedSubjectArray("WIA1002")),
        console.log(getHighestGrade("GIG1004")),
        console.log(getCommonGrade("GIG1004")),

        // console.log(takfaham),
        // console.log(susunTakFaham),

        // table, column "Highest Grade"
        // console.log(subjectArray),
        // console.log(sortedSubjectArray),
        // console.log(highestSubject),
        // console.log(highestSubject.Grades),

        // table, column "Typical Grade"
        // console.log(commonGradeFreq),
        // console.log(commonGrade),

        <View style={globalStyles.container}>

            <Header text='Group Dashboard' />
            <View style={styles.cardContainer}>
                <FlatList
                    data={studentsTable}
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
        height: 50
    },
    tableRow: {
        flexDirection: "row",
        margin: 1,
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
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    body3: {
        fontFamily: "nunito-regular",
        fontSize: 16,
        lineHeight: 22
    },
    h1: {
        fontFamily: "nunito-bold",
        fontSize: 30,
        lineHeight: 36
    },

});
