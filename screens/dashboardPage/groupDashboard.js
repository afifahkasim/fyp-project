import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View, ImageBackground, TextInput, LogBox, StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    Alert,
} from 'react-native';
import { globalStyles } from '../../styles/global';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
    LineChart,
    BarChart,
} from "react-native-chart-kit";
import { AuthContext } from "../../routes/authProvider";
import DashboardCard from '../../shared/cardDashboard';
import DashboardHeader from '../../shared/headerDashboard';
import { Ionicons } from '@expo/vector-icons';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _, { initial, isUndefined, values } from "lodash";
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



    const listTab5 = [
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

    const studentsData = [
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

    const [displayStatus, setDisplayStatus] = useState(false)

    const listTab6 = [
        {
            Status: false,
            Name: "Hide Filters"
        },
        {
            Status: true,
            Name: "Display Filters"
        }
    ]

    const [studentsGender, setStudentsGender] = useState(null)
    const [studentsDepartment, setStudentsDepartment] = useState(null)
    const [studentsGroup, setStudentsGroup] = useState(1)
    const [studentsList, setStudentsList] = useState(studentsData)

    const allSGPAList = _.flatMap(studentsList, 'SGPA')
    const allResultsList = _.flatMap(studentsList, 'results')

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

    function compareRank(left, right) {
        return gradeRank[left.Grades] - gradeRank[right.Grades]
    }

    function getSortedSubjectArray(course) {
        const subjectArray = studentsList.map(e => _.find(e.results, { CourseCode: course }))
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

    const getAverageGrade = (course) => {
        const averageGradeFreq = _.countBy(getSortedSubjectArray(course), "Grades")
        const averageGrade = _.maxBy(_.keys(averageGradeFreq), o => averageGradeFreq[o]);
        const nonaverageGrade = _.minBy(_.keys(averageGradeFreq), o => averageGradeFreq[o]);
        if (averageGrade === "undefined") {
            return nonaverageGrade
        }
        else {
            return averageGrade
        }
    }

    // for table, initial value
    const listOfSubjects = _.uniqBy(_.flatMap(studentsList, 'results'), 'CourseCode')
    const getInitialListOfSubjects = () => {
        const initialListOfSubjects = []
        listOfSubjects.map((e, index) => {
            const HGval = getHighestGrade(e.CourseCode)
            const AGval = getAverageGrade(e.CourseCode)

            const val = {
                Semester: e.Semester,
                CourseCode: e.CourseCode,
                Subject: e.Subject,
                CreditHours: e.CreditHours,
                HighestGrade: HGval,
                AverageGrade: AGval
            }
            initialListOfSubjects.push(val)
        })
        return initialListOfSubjects
    }

    const initialStudentsTable = getInitialListOfSubjects()


    const [sgpaLine, setSGPALine] = useState(allSGPAList)
    const [resultsList, setResultsList] = useState(allResultsList)
    const [studentsTable, setStudentsTable] = useState(initialStudentsTable)


    // const updateAfterGenderFilter =  () => {
    //     setSGPALine(allSGPAList)
    //     setResultsList(allResultsList)
    //     setStudentsTable(initialStudentsTable)
    // }

    const setGenderFilter = Gender => {
        if (studentsList === studentsData) {
            setStudentsList([...studentsData.filter(e => e.Gender === Gender)]);
        }
        else {
            setStudentsList([...studentsList.filter(e => e.Gender === Gender)]);
        }
        setStudentsGender(Gender)
    }

    const resetGenderFilter = () => {
        if (studentsDepartment === null) {
            setStudentsList(studentsData)
        }
        else {
            // setStudentsList([...studentsData.filter(e => e.Department === studentsDepartment)])
            setStudentsList(studentsData)
        }
        setStudentsGender(null)
    }

    const setDepartmentFilter = Department => {
        if (studentsList === studentsData) {
            setStudentsList([...studentsData.filter(e => e.Department === Department)]);
        }
        else {
            setStudentsList([...studentsList.filter(e => e.Department === Department)]);
        }
        setStudentsDepartment(Department)
    }

    const resetDepartmentFilter = () => {
        if (studentsGender === null) {
            setStudentsList(studentsData)
        }
        else {
            setStudentsList(studentsList)
        }
        setStudentsDepartment(null)
    }

    const setGroupFilter = GroupID => {
        setStudentsList([...studentsData.filter(e => e.GroupID.includes(GroupID))])
        setStudentsDepartment(null)
        setStudentsGender(null)
        setStudentsGroup(GroupID)
    }

    const resetGroupFilter = () => {
        setStudentsList(studentsData)
        setStudentsDepartment(null)
        setStudentsGender(null)
        setStudentsGroup(1)
    }

    useEffect(() => {
        setSGPALine(allSGPAList)
        setResultsList(allResultsList)
        setStudentsTable(initialStudentsTable)
        // setStudentsList(prevState => ({...prevState, studentsData}))
    }, [studentsList])








    // const subjectArray = studentsData.map(e => _.find(e.results, { CourseCode: "GIG1002" }))

    // const sortedSubjectArray = _.orderBy(subjectArray, function (obj) {
    //     return gradeRank[obj.Grades]
    // }, ['asc'])
    // const sortedSubjectArray = _.orderBy(subjectArray, o => gradeRank[o.Grades], ['asc'])
    // const highestSubject = _.maxBy(sortedSubjectArray, 'Grades')
    // const highestSubject = sortedSubjectArray[0].Grades

    // // for table, column "average grade"
    // const averageGradeFreq = _.countBy(sortedSubjectArray.map(key => key.Grades))
    // const averageGrade = _.maxBy(_.keys(averageGradeFreq), o => averageGradeFreq[o]);



    const [columns, setColumns] = useState([
        "Semester",
        "CourseCode",
        "Subject",
        "CreditHours",
        "HighestGrade",
        "AverageGrade"
    ])
    const [cosmeticColumns, setCosmeticColumns] = useState([
        "Sem",
        "Course\nCode",
        "Subject",
        "Credit\nHours",
        "Highest\nGrade",
        "Average\nGrade"
    ])






    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [sem, setSem] = useState(null);
    // const [sgpaList, setSGPAList] = useState(averageSGPAlist)



    const listTab = _.uniqBy(listOfSubjects.map(key => _.pick(key, ['Semester'])), 'Semester')
    // const listTab3 = [
    //     {
    //         Gender: "Male"
    //     },
    //     {
    //         Gender: "Female"
    //     }
    // ]
    const listTab3 = _.uniqBy(studentsList.map(key => _.pick(key, ['Gender'])), 'Gender')
    const listTab4 = _.uniqBy(studentsList.map(key => _.pick(key, ['Department'])), 'Department')

    const setStatusFilter = Semester => {
        setResultsList([...allResultsList.filter(e => e.Semester === Semester)]);
        setStudentsTable([...initialStudentsTable.filter(e => e.Semester === Semester)]);
        // setSGPAList([...averageSGPAlist.filter(e => e.Semester === Semester)]);
        setSGPALine([...allSGPAList.filter(e => e.Semester === Semester)]);
        setSem(Semester)
    }

    const resetStatusFilter = () => {
        setResultsList(allResultsList);
        setStudentsTable(initialStudentsTable);
        // setSGPAList(averageSGPAlist);
        setSGPALine(allSGPAList)
        setSem(null)
    }


    const [graphStatus, setGraphStatus] = useState(false);
    const [cards, setCards] = useState(false);
    const toggleCards = () => {
        setCards(!cards);
    };

    const [barChart, setBarChart] = useState(false);
    const toggleBarChart = () => {
        setBarChart(!barChart);
    };

    const [pieChart, setPieChart] = useState(false);
    const togglePieChart = () => {
        setPieChart(!pieChart);
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
            Graph: "Pie Chart"
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

    const setGraphFilter = Graph => {
        if (Graph === "Cards") {
            toggleCards();
        }
        if (Graph === "Bar Chart") {
            toggleBarChart();
        }
        if (Graph === "Pie Chart") {
            togglePieChart();
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
        setPieChart(false);
        setLineChart(false);
        setTable(false);
        setGraphStatus(false)
    }

    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData1 = _.orderBy(studentsTable, [column], [newDirection])
        const sortedData2 = _.orderBy(studentsTable, function (obj) {
            return gradeRank[obj.HighestGrade]
        }, [newDirection])
        const sortedData3 = _.orderBy(studentsTable, function (obj) {
            return gradeRank[obj.AverageGrade]
        }, [newDirection])

        setSelectedColumn(column)
        setDirection(newDirection)
        if (column === "HighestGrade") {
            setStudentsTable(sortedData2)
        }
        else if (column === "AverageGrade") {
            setStudentsTable(sortedData3)
        }
        else {
            setStudentsTable(sortedData1)
        }
    }

    // int, total number of students
    const numOfStudents = studentsList.length // this one is for card

    // array, total grade points of every student
    // const renderGradePoints = studentsData.map(
    //     e => e.results.map(f => f.GradePoints).reduce((a, b) => a + b))
    // const renderGradePoints1 = allResultsList.map(f => f.GradePoints).reduce((a, b) => a + b).toFixed(2)
    // const renderCreditHours = studentsData.map(
    //     e => e.results.map(f => f.CreditHours).reduce((a, b) => a + b))
    // const renderCreditHours1 = allResultsList.map(f => f.CreditHours).reduce((a, b) => a + b).toFixed(2)
    // const averageCGPA1 = (renderGradePoints1 / renderCreditHours1).toFixed(2)


    // const renderCGPA = renderGradePoints.map((e, index) => e / renderCreditHours[index])

    const renderCGPA = studentsList.map(e => e.CGPA) // this can be used for pie chart
    const totalStudentsCGPA = renderCGPA.map(e => e).reduce((a, b) => a + b)
    const averageCGPA = (totalStudentsCGPA / numOfStudents).toFixed(2) // this one is for card

    const averageCreditHours = (_.sumBy(resultsList, 'CreditHours') / numOfStudents).toFixed(2)
    const averageGradePoints = (_.sumBy(resultsList, 'GradePoints') / numOfStudents).toFixed(2) // this one is for card

    // average GPA for every sem, this one is for line chart
    const renderCountSemester = _.uniqBy(sgpaLine, 'Semester')
    const averageSGPAlabels = renderCountSemester.map(e => "Sem " + e.Semester) // use this for line chart
    // const averageSGPAlabels1 = averageSGPAlist.map(key => "Sem " + key.Semester)
    // const averageSGPAdata1 = averageSGPAlist.map(key => key.AverageGPA)
    // const resultsAllStudents = _.map(studentsData, 'results')  --- i gave up, just gonna input sgpa into every user


    const totalSGPA = sgpaLine.reduce((c, i) => { c[i.Semester] = (c[i.Semester] || 0) + parseFloat(i.GPA); return c }, {});
    const convertedTotalSGPA = _.values(totalSGPA)
    const averageSGPAdata = convertedTotalSGPA.map(e => e / numOfStudents) // use this for line chart

    // array of objects, where [{semester: val, averagesgpa: val}]
    // will be used as sgpaList's initial val
    // const getAverageSGPA = () => {
    //     let val = {}
    //     let a = []
    //     averageSGPAdata.map((e, index) => {
    //         val = {
    //             Semester: index + 1,
    //             AverageGPA: averageSGPAdata[index].toFixed(2)
    //         }
    //         a.push(val)
    //     })
    //     return a
    // }

    // const averageSGPAlist = getAverageSGPA()


    // this one is for bar chart
    const sortedAllSubject = _.sortBy(resultsList, e => gradeRank[e.Grades], ['asc'])
    const countGradeFreq = _.countBy(sortedAllSubject.map(key => key.Grades))
    const GradeFreqdata = _.values(countGradeFreq)
    const GradeFreqlabels = _.keys(countGradeFreq)



    // for card "Top Subject" and "Lowest Subject"
    const sortedAverageSubject = _.orderBy(studentsTable, function (obj) {
        return gradeRank[obj.AverageGrade]
    }, ['asc'])

    // this one is for pie chart
    function renderCGPArange(arr) {
        let arrayCGPArange = []
        let cgpacat = ''
        let val = {}
        let a = []
        if (arr === renderCGPA) {
            renderCGPA.map(e => {
                if (e >= 3.70) { cgpacat = "3.70 - 4.00" }
                else if (e >= 3.30 && e <= 3.69) { cgpacat = "3.30 - 3.69" }
                else if (e >= 2.70 && e <= 3.29) { cgpacat = "2.70 - 3.29" }
                else if (e >= 2.00 && e <= 2.69) { cgpacat = "2.00 - 2.69" }
                else if (e >= 0.00 && e <= 1.99) { cgpacat = "0.00 - 1.99" }
                arrayCGPArange.push(cgpacat)
            })
        }
        else {
            sgpaLine.map(f => f.GPA).map(e => {
                if (e >= 3.70) { cgpacat = "3.70 - 4.00" }
                else if (e >= 3.30 && e <= 3.69) { cgpacat = "3.30 - 3.69" }
                else if (e >= 2.70 && e <= 3.29) { cgpacat = "2.70 - 3.29" }
                else if (e >= 2.00 && e <= 2.69) { cgpacat = "2.00 - 2.69" }
                else if (e >= 0.00 && e <= 1.99) { cgpacat = "0.00 - 1.99" }
                arrayCGPArange.push(cgpacat)
            })
        }
        let countCGPArange = _.countBy(arrayCGPArange)
        let xVal = _.keys(countCGPArange)
        let yVal = _.values(countCGPArange)

        xVal.map((e, index) => {
            let percentage = (yVal[index] / renderCGPA.length * 100).toFixed(0)
            val = {
                x: xVal[index],
                y: yVal[index],
                label: `${percentage}%\n(${yVal[index]})`,
            }
            a.push(val)
        })

        return a
    }

    const CGPArangedata = renderCGPArange(renderCGPA)
    const GPArangedata = renderCGPArange(sgpaLine)

    function renderCGPArangeLegend(arr) {
        let val = {}
        let b = []
        if (arr === renderCGPA) {
            CGPArangedata.map((e, index) => {
                val = {
                    name: e.x
                }
                b.push(val)
            })
        }
        else {
            GPArangedata.map((e, index) => {
                val = {
                    name: e.x
                }
                b.push(val)
            })
        }
        return b
    }

    const CGPArangelegend = renderCGPArangeLegend(renderCGPA)
    const GPArangelegend = renderCGPArangeLegend(sgpaLine)

    const renderPieChart = () => {
        let chartData = []
        let chartLegend = [{}]
        let titleChart = ""
        let titleLegend = ""
        let xLegend = null
        if (sem !== null) {
            chartData = GPArangedata
            chartLegend = GPArangelegend
            titleChart = "# of Students by GPA Range"
            titleLegend = "GPA Range"
        }
        else {
            chartData = CGPArangedata
            chartLegend = CGPArangelegend
            titleChart = "# of Students by CGPA Range"
            titleLegend = "CGPA Range"
        }
        if (chartLegend.length > 1) {
            xLegend = (Dimensions.get('window').width - 42) / 3.8
        }
        else {
            xLegend = (Dimensions.get('window').width - 42) / 2.7
        }

        // let totalStudentCount = chartData.reduce((a, b) => a + (b.count || 0), 0)
        // console.log("Check Chart")
        // console.log(chartData)

        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Svg
                    width={Dimensions.get('window').width - 42}
                    height={425}
                    style={{ width: "100%", flexDirection: 'column' }}>
                    <Text style={styles.chartTitle}>{titleChart}</Text>

                    <VictoryPie
                        padAngle={({ datum }) => datum.y}
                        standalone={false} // Android workaround
                        data={chartData}
                        labels={({ datum }) => datum.y}
                        // radius={({ datum }) => (selectedColumn && selectedColumn.name == datum.name) ? Dimensions.get('window').width * 0.4 : Dimensions.get('window').width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => ((Dimensions.get('window').width - 42) * 0.385 + innerRadius) / 2.5}

                        style={{
                            labels: { fill: "white", ...styles.body3, fontSize: ({ text }) => text.length > 10 ? 10 : 12 },
                            parent: {
                                ...styles.shadow,
                            },
                        }}
                        colorScale="cool"
                        width={Dimensions.get('window').width - 42}
                        height={350}

                    />
                    <VictoryLegend x={xLegend} y={315}
                        title={titleLegend}
                        centerTitle
                        width={Dimensions.get('window').width}
                        height={425}
                        borderPadding={{ top: 7, bottom: 5, left: 10 }}
                        orientation="horizontal"
                        gutter={25}
                        itemsPerRow={2}
                        style={{
                            parent: {},
                            border: { stroke: "black" },
                            labels: { fontSize: 9, fontFamily: 'nunito-bold' },
                        }}
                        colorScale="cool"
                        data={chartLegend}
                    />
                </Svg>
                <View style={{ position: 'absolute', top: '32.5%', left: "41%" }}>
                    <Text style={{ ...styles.h1, textAlign: 'center' }}>{numOfStudents}</Text>
                    <Text style={{ ...styles.body3, textAlign: 'center' }}>Total{"\n"}Students</Text>
                </View>
            </View>
        )
    }


    const renderHeader = () => (
        <View style={styles.cardContainer}>
            {/* <View style={styles.filterInner}>
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
            </View> */}

            {/* [GroupDashboard] Select Group Filter */}
            <View>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.listTab}>
                        <View style={styles.listIcon}>
                            <Image
                                source={group}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            {/* <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} /> */}
                        </View>

                        {
                            listTab5.map((e, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.btnTab,
                                        {
                                            width: Dimensions.get('window').width / listTab.length - 20,
                                            // maxWidth: Dimensions.get('window').width / 3.5
                                        },
                                        studentsGroup === e.GroupID && styles.btnTabActive]}
                                    onPress={() => setGroupFilter(e.GroupID)}
                                >

                                    {/* If unselected, normal tab style, if selected, active tab style */}
                                    <Text style={[styles.textTab, studentsGroup === e.GroupID && styles.textTabActive]}>
                                        {e.GroupName}
                                    </Text>

                                    {/* If selected, display icon */}
                                    {studentsGroup === e.GroupID ?
                                        <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                        :
                                        <View></View>}
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>


            {/* [GroupDashboard] Hide or Display Filter */}
            <View style={{ alignContent: "center", width: Dimensions.get('window').width, marginHorizontal: 20 }}>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.listTab}>

                        {
                            listTab6.map((e, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.btnTab,
                                        {
                                            width: Dimensions.get('window').width / listTab.length - 40,
                                            // maxWidth: Dimensions.get('window').width / 3.5
                                        },
                                        displayStatus === e.Status && styles.btnTabActive]}
                                    onPress={() => setDisplayStatus(e.Status)}
                                >

                                    {/* If unselected, normal tab style, if selected, active tab style */}
                                    <Text style={[styles.textTab, displayStatus === e.Status && styles.textTabActive]}>
                                        {e.Name}
                                    </Text>

                                    {/* If selected, display icon */}
                                    {displayStatus === e.Status ?
                                        <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                        :
                                        <View></View>}
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>

            {/* [GroupDashboard] Select Semester Filter */}
            {displayStatus !== false ?
                <View>
                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.listTab}>
                            <View style={styles.listIcon}>
                            <Image
                                source={semester}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                                {/* <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} /> */}
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
                : <View></View>}

            {/* [GroupDashboard] Select Graph Filter */}
            {displayStatus !== false ?
                <View>
                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.listTab}>
                            <View style={styles.listIcon}>
                            <Image
                                source={graphs}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                                {/* <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} /> */}
                            </View>

                            {/* For when you wake up later, */}
                            {/* Sini letak butang untuk reset filter, use resetGraphFilter() */}
                            {/* Default value */}
                            <TouchableOpacity
                                style={[
                                    styles.btnTabActive,
                                    {
                                        width: Dimensions.get('window').width / listTab2.length + 50,
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
                                                width: Dimensions.get('window').width / listTab2.length + 45,
                                                // maxWidth: Dimensions.get('window').width / 3.5
                                            },
                                            (e.Graph === "Cards" && cards === true) && styles.btnTabActive,
                                            (e.Graph === "Bar Chart" && barChart === true) && styles.btnTabActive,
                                            (e.Graph === "Pie Chart" && pieChart === true) && styles.btnTabActive,
                                            (e.Graph === "Line Chart" && lineChart === true) && styles.btnTabActive,
                                            (e.Graph === "Table" && table === true) && styles.btnTabActive]}
                                        onPress={() => setGraphFilter(e.Graph)}
                                    >

                                        {/* If unselected, normal tab style, if selected, active tab style */}
                                        <Text style={[styles.textTab,
                                        (e.Graph === "Cards" && cards === true) && styles.textTabActive,
                                        (e.Graph === "Bar Chart" && barChart === true) && styles.textTabActive,
                                        (e.Graph === "Pie Chart" && pieChart === true) && styles.textTabActive,
                                        (e.Graph === "Line Chart" && lineChart === true) && styles.textTabActive,
                                        (e.Graph === "Table" && table === true) && styles.textTabActive]}>
                                            {e.Graph}
                                        </Text>

                                        {/* If selected, display icon */}
                                        {(e.Graph === "Cards" && cards === true)
                                            || (e.Graph === "Bar Chart" && barChart === true)
                                            || (e.Graph === "Line Chart" && lineChart === true)
                                            || (e.Graph === "Table" && table === true)
                                            || (e.Graph === "Pie Chart" && pieChart === true) ?
                                            <Ionicons name="close-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                            :
                                            <View></View>}
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
                : <View></View>
            }

            {/* [GroupDashboard] Select Gender Filter */}
            {displayStatus !== false ?
                <View>
                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.listTab}>
                            <View style={styles.listIcon}>
                            <Image
                                source={gender}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                                {/* <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} /> */}
                            </View>

                            {/* Default value */}
                            <TouchableOpacity
                                style={[
                                    styles.btnTabActive,
                                    {
                                        width: Dimensions.get('window').width / listTab.length - 65,
                                        // maxWidth: Dimensions.get('window').width / 3.5
                                    },
                                    studentsGender !== null && styles.btnTab
                                ]}
                                onPress={() => resetGenderFilter()}
                            >

                                {/* By default, active tab style, if unselected, normal tab style */}
                                <Text style={[styles.textTabActive, studentsGender !== null && styles.textTab]}>
                                    All Genders
                                </Text>

                                {/* By default, display icon */}
                                {studentsGender !== null ?
                                    <View></View>
                                    :
                                    <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                }

                                {/* Filtered value */}
                            </TouchableOpacity>
                            {
                                listTab3.map((e, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.btnTab,
                                            {
                                                width: Dimensions.get('window').width / listTab.length - 100,
                                                // maxWidth: Dimensions.get('window').width / 3.5
                                            },
                                            studentsGender === e.Gender && styles.btnTabActive]}
                                        onPress={() => setGenderFilter(e.Gender)}
                                    >

                                        {/* If unselected, normal tab style, if selected, active tab style */}
                                        <Text style={[styles.textTab, studentsGender === e.Gender && styles.textTabActive]}>
                                            {e.Gender}
                                        </Text>

                                        {/* If selected, display icon */}
                                        {studentsGender === e.Gender ?
                                            <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                            :
                                            <View></View>}
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
                : <View></View>
            }

            {/* [GroupDashboard] Select Department Filter */}
            {displayStatus !== false ?
                <View>
                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.listTab}>
                            <View style={styles.listIcon}>
                            <Image
                                source={department}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                                {/* <Ionicons name="filter-sharp" size={20} color="steelblue" style={{ alignContent: 'flex-end' }} /> */}
                            </View>

                            {/* Default value */}
                            <TouchableOpacity
                                style={[
                                    styles.btnTabActive,
                                    {
                                        width: Dimensions.get('window').width / listTab.length - 30,
                                        // maxWidth: Dimensions.get('window').width / 3.5
                                    },
                                    studentsDepartment !== null && styles.btnTab
                                ]}
                                onPress={() => resetDepartmentFilter()}
                            >

                                {/* By default, active tab style, if unselected, normal tab style */}
                                <Text style={[styles.textTabActive, studentsDepartment !== null && styles.textTab]}>
                                    All Departments
                                </Text>

                                {/* By default, display icon */}
                                {studentsDepartment !== null ?
                                    <View></View>
                                    :
                                    <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                }

                                {/* Filtered value */}
                            </TouchableOpacity>
                            {
                                listTab4.map((e, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.btnTab,
                                            {
                                                width: Dimensions.get('window').width / listTab.length,
                                                // maxWidth: Dimensions.get('window').width / 3.5
                                            },
                                            studentsDepartment === e.Department && styles.btnTabActive]}
                                        onPress={() => setDepartmentFilter(e.Department)}
                                    >

                                        {/* If unselected, normal tab style, if selected, active tab style */}
                                        <Text style={[styles.textTab, studentsDepartment === e.Department && styles.textTabActive]}>
                                            {e.Department}
                                        </Text>

                                        {/* If selected, display icon */}
                                        {studentsDepartment === e.Department ?
                                            <Ionicons name="checkmark-circle-sharp" size={20} color="black" style={{ alignContent: 'flex-end' }} />
                                            :
                                            <View></View>}
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
                : <View></View>
            }


            {/* [GroupDashboard] Cards for Total Students, Average CGPA/GPA and Average Grade Points */}
            {(cards === true || graphStatus === false) ?
                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                    <View style={styles.cardInner}>
                        <DashboardCard>
                            <Text style={styles.cardText}>{numOfStudents}</Text>
                            <Text style={styles.cardSubtext}>Total Students</Text>
                        </DashboardCard>
                    </View>

                    <View style={styles.cardInner}>
                        <DashboardCard>
                            <Text style={styles.cardText}>{sem === null ? averageCGPA : averageSGPAdata[0].toFixed(2)}</Text>
                            {sem === null ?
                                <Text style={styles.cardSubtext}>Average CGPA</Text>
                                :
                                <Text style={styles.cardSubtext}>Average GPA</Text>
                            }
                        </DashboardCard>
                    </View>

                    <View style={styles.cardInner}>
                        <DashboardCard>
                            <Text style={styles.cardText}>{averageGradePoints}</Text>
                            <Text style={styles.cardSubtext}>Avg. Grade Points</Text>
                        </DashboardCard>
                    </View>
                </View>
                : <View></View>
            }

            {/* [GroupDashboard] Line Chart for Average GPA vs Semester */}
            {((lineChart === true || graphStatus === false) && sem === null) ?
                <DashboardCard>
                    <Text style={styles.chartTitle}>Average GPA vs Semester</Text>
                    <LineChart
                        data={{
                            labels: averageSGPAlabels,
                            datasets: [
                                {
                                    data: averageSGPAdata
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
                : <View></View>
            }

            {/* [GroupDashboard] Pie Chart for Average GPA vs Semester */}
            {(pieChart === true || graphStatus === false) ?
                <DashboardCard>
                    {/* <Card> */}
                    {renderPieChart()}
                    {/* </Card> */}
                </DashboardCard>
                : <View></View>
            }

            {/* [GroupDashboard] Bar Chart for Number of Subjects vs Grade */}
            {(barChart === true || graphStatus === false) ?
                <DashboardCard>
                    <Text style={styles.chartTitle}># of Subjects vs Grade</Text>
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
                </DashboardCard>
                : <View></View>
            }

            {/* [GroupDashboard] Cards for "Highest Average Subject", "Total Subjects Involved", "Lowest Average Subject" */}
            {(cards === true || graphStatus === false) ?
                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                    <View style={styles.cardInner}>
                        <DashboardCard>
                            <Text style={styles.cardText}>{sortedAverageSubject[0].CourseCode}</Text>
                            <Text style={styles.cardSubtext}>Highest Average Subject</Text>
                        </DashboardCard>
                    </View>

                    <View style={styles.cardInner}>
                        <DashboardCard>
                            <Text style={styles.cardText}>{studentsTable.length}</Text>
                            <Text style={styles.cardSubtext}>Total Subjects Involved</Text>
                        </DashboardCard>
                    </View>

                    <View style={styles.cardInner}>
                        <DashboardCard>
                            <Text style={styles.cardText}>{sortedAverageSubject[sortedAverageSubject.length - 1].CourseCode}</Text>
                            <Text style={styles.cardSubtext}>Lowest Average Subject</Text>
                        </DashboardCard>
                    </View>
                </View>
                : <View></View>
            }


            {/* [groupDashboard] Table headers for list of subjects */}
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
                : <View></View>
            }

        </View>
    )

    const renderTable = ({ item, index }) => {
        return (
            <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.Semester}</Text>
                <Text style={styles.columnRowTxt}>{item.CourseCode}</Text>
                <Text style={styles.columnRowTxt} adjustsFontSizeToFit numberOfLines={3}>{item.Subject}</Text>
                <Text style={styles.columnRowTxt}>{item.CreditHours}</Text>
                <Text style={styles.columnRowTxt}>{item.HighestGrade}</Text>
                <Text style={styles.columnRowTxt}>{item.AverageGrade}</Text>

            </View>
        )
    }

    const renderFooter = () => (
        <View>

        </View>
    )


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
        // console.log(sortedAllSubject),
        // console.log(countGradeFreq),
        // console.log(GradeFreqlabels),

        // pie chart
        // console.log(CGPArangedata),
        // console.log(CGPArangelegend),

        // table initial value
        // console.log(listOfSubjects),
        // console.log(studentsTable),
        // console.log(getSortedSubjectArray("WIA1002")),
        // console.log(getHighestGrade("GIG1004")),
        // console.log(getaverageGrade("GIG1004")),

        // console.log(takfaham),
        // console.log(susunTakFaham),

        // table, column "Highest Grade"
        // console.log(subjectArray),
        // console.log(sortedSubjectArray),
        // console.log(highestSubject),
        // console.log(highestSubject.Grades),

        // table, column "Typical Grade"
        // console.log(averageGradeFreq),
        // console.log(averageGrade),

        // card, "top subject" and "lowest subject"
        // console.log(sortedAverageSubject),

        // filter
        // console.log(listTab4),

        <View style={globalStyles.container}>

            <DashboardHeader text='Group Dashboard' />
            <View style={styles.cardContainer}>
                <FlatList
                    data={studentsTable}
                    style={{ maxHeight: Dimensions.get('window').height - 100, width: "90%" }}
                    horizontal={false}
                    keyExtractor={(item, index) => index + ""}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    // stickyHeaderIndices={[0]}
                    renderItem={(table === true || graphStatus === false) && renderTable}
                />
                <StatusBar style="auto" />

            </View>

        </View >
    );


}

const group = require("../../assets/icons/group.png");
const department = require("../../assets/icons/department2.png");
const semester = require("../../assets/icons/semester.png");
const graphs = require("../../assets/icons/graphs.png");
const gender = require("../../assets/icons/gender.png");


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
        alignSelf: "center",
        alignContent: "center",
        textAlign: "center",
        flexWrap: 'wrap',
        flex: 1,
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
