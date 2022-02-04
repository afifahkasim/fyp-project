import React,{useState, useContext} from 'react';
import { Icon } from 'react-native-elements';
import Apikey from "../../database/apiKey";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthContext } from "../../routes/authProvider";
import Header from '../../shared/header';
import TimeTable from '@mikezzb/react-native-timetable';
//import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, 
    Text, 
    View,
    Pressable,  
    TouchableOpacity,
    FlatList,
    ScrollView,
    LogBox,
    Alert,
   Modal,
   Button,
   
  } from 'react-native';
//import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';

  if (!firebase.apps.length) { firebase.initializeApp(Apikey.firebaseConfig); }

  const db = firebase.firestore();
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  export default function Coursescheduler({navigation}){
  const { user, Logout, profile } = useContext(AuthContext);

  const courseData=[
    {
      id:1,
      Course_code: "GIG1005",
      courseId: "GIG1005",
      Lecture_group: "-",
      Tutorial_group: "WIC",
      Course_name: "The Islamic and Asian Civilization",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "PLY",
      Department: "Computer System and Network",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "49",
    },

    {
      id:2,
      Course_code: "GIG1005",
      courseId: "GIG1005",
      Lecture_group: "-",
      Tutorial_group: "WID",
      Course_name: "The Islamic and Asian Civilization",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "SSAR",
      Department: "Artificial Intelligence",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "91",
    },

    {
      id:3,
      Course_code: "GIG1005",
      courseId: "GIG1005",
      Lecture_group: "-",
      Tutorial_group: "WIH",
      Course_name: "The Islamic and Asian Civilization",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "AAN",
      Department: "Multimedia",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "49",
    },

    {
      id:4,
      Course_code: "GIG1005",
      courseId: "GIG1005",
      Lecture_group: "-",
      Tutorial_group: "WIE",
      Course_name: "The Islamic and Asian Civilization",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "AAN",
      Department: "Information Systems",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "44",
    },

    {
      id:5,
      Course_code: "GIG1005",
      courseId: "GIG1005",
      Lecture_group: "-",
      Tutorial_group: "WIF",
      Course_name: "The Islamic and Asian Civilization",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "NJ",
      Department: "Software Engineering",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "92",
    },

    {
      id:6,
      Course_code: "GIG1005",
      courseId: "GIG1005",
      Lecture_group: "-",
      Tutorial_group: "WIG",
      Course_name: "The Islamic and Asian Civilization",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "NF",
      Department: "Data Science",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "30",
    },

    {
      id:7,
      Course_code: "GIW1003",
      courseId: "GIW1003",
      Lecture_group: "-",
      Tutorial_group: "K, T, L",
      Course_name: "Fun With Robots",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "ZH",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Monday, 3-5pm",
      startTime: '15:00',
      endTime: '17:00',
      day: 1,
      Place: "Online",
      Number_Of_Student: "60",
    },

    {
      id:8,
      Course_code: "GIW1005",
      courseId: "GIW1005",
      Lecture_group: "-",
      Tutorial_group: "K, T, L",
      Course_name: "Mobile Typography Made Easy",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "NJ",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Monday, 3-5pm",
      startTime: '15:00',
      endTime: '17:00',
      day: 1,
      Place: "Online",
      Number_Of_Student: "30",
    },

    {
      id:9,
      Course_code: "GIW1006",
      courseId: "GIW1006",
      Lecture_group: "-",
      Tutorial_group: "K, T, L",
      Course_name: "Mutimedia 360",
      Course_explanation: "-",
      Credit_hour: 2,
      Lecturer_name: "NAA",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Monday, 3-5pm",
      startTime: '15:00',
      endTime: '17:00',
      day: 1,
      Place: "Online",
      Number_Of_Student: "30",
    },

    {
      id:10,
      Course_code: "WIX1002",
      courseId: "WIX1002",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Fundamentals Of Programming",
      Course_explanation: "This course covers problem solvingtechniques, the basic structure of computer program, the fundamental concepts of object-oriented programming, data types and operations, selection control structures.",
      Credit_hour: 5,
      Lecturer_name: "UO",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "70",
    },

    {
      id:11,
      Course_code: "WIX1002",
      courseId: "WIX1002",
      Lecture_group: "-",
      Tutorial_group: "T",
      Course_name: "Fundamentals Of Programming",
      Course_explanation: "This course covers problem solvingtechniques, the basic structure of computer program, the fundamental concepts of object-oriented programming, data types and operations, selection control structures.",
      Credit_hour: 5,
      Lecturer_name: "UO",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "70",
    },

    {
      id:12,
      Course_code: "WIX1003",
      courseId: "WIX1003",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Computer System and Organizations",
      Course_explanation: "This course covers the introduction to computer systems and organization which includes number system, boolean algebra, basic logic gates, function simplification, combinational circuit, latches and flipflop, sequential circuit and addressing mode.",
      Credit_hour: 4,
      Lecturer_name: "NMN",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 3-6pm",
      startTime: '13:00',
      endTime: '18:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "70",
    },

    {
      id:13,
      Course_code: "WIX2002",
      courseId: "WIX2002",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Project Management",
      Course_explanation: "This course introduces the fundamental of management concepts",
      Credit_hour: 3,
      Lecturer_name: "HSM",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 11-1pm",
      startTime: '11:00',
      endTime: '13:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "30",
    },

    {
      id:14,
      Course_code: "WIX2002",
      courseId: "WIX2002",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Project Management",
      Course_explanation: "This course introduces the fundamental of management concepts",
      Credit_hour: 3,
      Lecturer_name: "RA",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-12pm",
      startTime: '11:00',
      endTime: '12:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "30",
    },

    {
      id:15,
      Course_code: "WIX3001",
      courseId: "WIX3001",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Soft Computing",
      Course_explanation: "This course introduces data structures in the context of object orientation. Concepts of objectoriented programming covered include class, object, encapsulation, inheritance, and polymorphism",
      Credit_hour: 3,
      Lecturer_name: "WCS",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Wednesday, 4-6pm",
      startTime: '16:00',
      endTime: '18:00',
      day: 3,
      Place: "Online",
      Number_Of_Student: "240",
    },

    {
      id:16,
      Course_code: "WIX3001",
      courseId: "WIX3001",
      Lecture_group: "-",
      Tutorial_group: "T1",
      Course_name: "Soft Computing",
      Course_explanation: "This course introduces data structures in the context of object orientation. Concepts of objectoriented programming covered include class, object, encapsulation, inheritance, and polymorphism",
      Credit_hour: 3,
      Lecturer_name: "WCS",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursaday, 4-6pm",
      startTime: '14:00',
      endTime: '18:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "60",
    },

    {
      id:17,
      Course_code: "WIX3001",
      courseId: "WIX3001",
      Lecture_group: "-",
      Tutorial_group: "T2",
      Course_name: "Soft Computing",
      Course_explanation: "This course introduces data structures in the context of object orientation. Concepts of objectoriented programming covered include class, object, encapsulation, inheritance, and polymorphism",
      Credit_hour: 3,
      Lecturer_name: "WCS",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Friday, 2-3pm",
      startTime: '14:00',
      endTime: '15:00',
      day: 5,
      Place: "Online",
      Number_Of_Student: "60",
    },

    {
      id:18,
      Course_code: "WIX3001",
      courseId: "WIX3001",
      Lecture_group: "-",
      Tutorial_group: "T3",
      Course_name: "Soft Computing",
      Course_explanation: "This course introduces data structures in the context of object orientation. Concepts of objectoriented programming covered include class, object, encapsulation, inheritance, and polymorphism",
      Credit_hour: 3,
      Lecturer_name: "MNR",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursaday, 1-2pm",
      startTime: '13:00',
      endTime: '114:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "60",
    },

    {
      id:19,
      Course_code: "WIX3001",
      courseId: "WIX3001",
      Lecture_group: "-",
      Tutorial_group: "T4",
      Course_name: "Soft Computing",
      Course_explanation: "This course introduces data structures in the context of object orientation. Concepts of objectoriented programming covered include class, object, encapsulation, inheritance, and polymorphism",
      Credit_hour: 3,
      Lecturer_name: "MNR",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Friday, 11-12pm",
      startTime: '11:00',
      endTime: '12:00',
      day: 5,
      Place: "Online",
      Number_Of_Student: "60",
    },

    {
      id:20,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K1",
      Tutorial_group: "-",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "LIM",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "200",
    },

    {
      id:21,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K2",
      Tutorial_group: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Course_name: "Data Structure",
      Course_explanation: "-",
      Credit_hour: 5,
      Lecturer_name: "HWL",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "160",
    },

    {
      id:22,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K1",
      Tutorial_group: "T1",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "LIM",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },

    {
      id:23,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K1",
      Tutorial_group: "T2",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "AD",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },

    {
      id:24,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K1",
      Tutorial_group: "T3",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "AD",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Friday, 2-5pm",
      startTime: '14:00',
      endTime: '17:00',
      day: 5,
      Place: "Online",
      Number_Of_Student: "40",
    },

    {
      id:25,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K1",
      Tutorial_group: "T4",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "MHN",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },

    {
      id:26,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K1",
      Tutorial_group: "T5",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "MHN",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Friday, 2-5pm",
      startTime: '14:00',
      endTime: '17:00',
      day: 5,
      Place: "Online",
      Number_Of_Student: "40",
    },
    {
      id:27,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K2",
      Tutorial_group: "T6",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "HWL",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },
    {
      id:28,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K2",
      Tutorial_group: "T7",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "MSS",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },
    {
      id:29,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K2",
      Tutorial_group: "T8",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "OSY",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },
    {
      id:30,
      Course_code: "WIA1002 / WIB1002",
      courseId: "WIA1002 / WIB1002",
      Lecture_group: "K2",
      Tutorial_group: "T9",
      Course_name: "Data Structure",
      Course_explanation: "This course introduces the concept of abstraction in problem solving. Basic data structures, like linked list, stack, queue, and binary tree, are explained in details.",
      Credit_hour: 5,
      Lecturer_name: "CTK",
      Department: "All Department",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 11-2pm",
      startTime: '11:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "40",
    },
    {
      id:31,
      Course_code: "WIB1001",
      courseId: "WIB1001",
      Lecture_group: "K",
      Tutorial_group: "T",
      Course_name: "Fundamental Of Multimedia",
      Course_explanation: "-",
      Credit_hour: 3,
      Lecturer_name: "NF",
      Department: "Multimedia",
      Semester: 2,
      Year: "2020/2021",
      Time: "Wednesday, 2-5pm",
      startTime: '14:00',
      endTime: '17:00',
      day: 3,
      Place: "Online",
      Number_Of_Student: "60",
    },
    {
      id:32,
      Course_code: "WIC1001",
      courseId: "WIC1001",
      Lecture_group: "G1",
      Tutorial_group: "-",
      Course_name: "Advance Network Technology",
      Course_explanation: "This course is designed to provide students the overall concept and needs of network technologies in advance level.",
      Credit_hour: 3,
      Lecturer_name: "ATF",
      Department: "Computer System and Network",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-12pm",
      startTime: '9:00',
      endTime: '12:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "50",
    },
    {
      id:33,
      Course_code: "WIC2001",
      courseId: "WIC2001",
      Lecture_group: "G2",
      Tutorial_group: "-",
      Course_name: "Advance Network Technology",
      Course_explanation: "This course is designed to provide students the overall concept and needs of network technologies in advance level.",
      Credit_hour: 3,
      Lecturer_name: "NBA",
      Department: "Computer System and Network",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-12pm",
      startTime:'9:00',
      endTime: '12:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "50",
    },
    {
      id:34,
      Course_code: "WID2001",
      courseId: "WID2001",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Knowledge Presentation and Reasoning",
      Course_explanation: "This course describes the different kinds of knowledge and their related engineering processes.",
      Credit_hour: 3,
      Lecturer_name: "RM",
      Department: "Artificial Intelligence",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "120",
    },
    {
      id:35,
      Course_code: "WID2001",
      courseId: "WID2001",
      Lecture_group: "T1",
      Tutorial_group: "-",
      Course_name: "Knowledge Presentation and Reasoning",
      Course_explanation: "This course describes the different kinds of knowledge and their related engineering processes.",
      Credit_hour: 3,
      Lecturer_name: "RM",
      Department: "Artificial Intelligence",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 12-1pm",
      startTime: '12:00',
      endTime: '13:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "60",
    },
    {
      id:36,
      Course_code: "WID2001",
      courseId: "WID2001",
      Lecture_group: "T2",
      Tutorial_group: "-",
      Course_name: "Knowledge Presentation and Reasoning",
      Course_explanation: "This course describes the different kinds of knowledge and their related engineering processes.",
      Credit_hour: 3,
      Lecturer_name: "RM",
      Department: "Artificial Intelligence",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 1-2pm",
      startTime: '13:00',
      endTime: '14:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "60",
    },
    {
      id:37,
      Course_code: "WIE2001",
      courseId: "WIE2001",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Trend in Information Systems",
      Course_explanation: "Topics under this course heading vary from year to year according to the developments in computer technology and information systems.",
      Credit_hour: 3,
      Lecturer_name: "NMY",
      Department: "Information Systems",
      Semester: 2,
      Year: "2020/2021",
      Time: "Monday, 3-5pm",
      startTime: '15:00',
      endTime: '17:00',
      day: 1,
      Place: "Online",
      Number_Of_Student: "50",
    },
    {
      id:38,
      Course_code: "WIE2001",
      courseId: "WIE2001",
      Lecture_group: "-",
      Tutorial_group: "T",
      Course_name: "Trend in Information Systems",
      Course_explanation: "Topics under this course heading vary from year to year according to the developments in computer technology and information systems.",
      Credit_hour: 3,
      Lecturer_name: "NMY",
      Department: "Information Systems",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 2-3pm",
      startTime: '14:00',
      endTime: '15:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "50",
    },
    {
      id:39,
      Course_code: "WIH2001",
      courseId: "WIH2001",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Data Analytics",
      Course_explanation: "-",
      Credit_hour: 3,
      Lecturer_name: "HWL",
      Department: "Data Science",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 12-2pm",
      startTime: '12:00',
      endTime: '14:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "30",
    },

    {
      id:40,
      Course_code: "WIH2001",
      courseId: "WIH2001",
      Lecture_group: "-",
      Tutorial_group: "T",
      Course_name: "Data Analytics",
      Course_explanation: "This course aims to develop students' ability to describe, explore and analyze data using suitable data analytics techniques",
      Credit_hour: 3,
      Lecturer_name: "HWL",
      Department: "Data Science",
      Semester: 2,
      Year: "2020/2021",
      Time: "Thursday, 9-10am",
      startTime: '9:00',
      endTime: '10:00',
      day: 4,
      Place: "Online",
      Number_Of_Student: "30",
    },
    {
      id:41,
      Course_code: "WIF2001",
      courseId: "WIF2001",
      Lecture_group: "K1",
      Tutorial_group: "-",
      Course_name: "Human Computer Interaction",
      Course_explanation: "-",
      Credit_hour: 3,
      Lecturer_name: "NJ",
      Department: "Software Engineering",
      Semester: 2,
      Year: "2020/2021",
      Time: "Tuesday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 2,
      Place: "Online",
      Number_Of_Student: "100",
    },
    {
      id:42,
      Course_code: "WIG2001",
      courseId: "WIG2001",
      Lecture_group: "K",
      Tutorial_group: "-",
      Course_name: "Digital Image Processing",
      Course_explanation: "-",
      Credit_hour: 3,
      Lecturer_name: "HZ",
      Department: "Multimedia",
      Semester: 2,
      Year: "2020/2021",
      Time: "Wednesday, 9-11am",
      startTime: '9:00',
      endTime: '11:00',
      day: 3,
      Place: "Online",
      Number_Of_Student: "50",
    },


  ];

  const Tabsem=[
    {
      Semester: 2,
    },
  ];

  const Tabyear=[
    {
      Year: "2020/2021"
    },
  ];

  const Tabdep=[
    {
      Department: "All Department"
    },
    {
      Department: "Computer System and Network"
    },
    {
      Department: "Artificial Intelligence"
    },
    {
      Department: "Multimedia"
    },
    {
      Department: "Information Systems"
    },
    {
      Department: "Software Engineering"
    },
    {
      Department: "Data Science"
    },
  ];

  const pressPlanner = () => {  
    navigation.navigate('Planner');  
  }

  const [semester, setSemester] = useState(null);
  const [department, setDepartment] = useState(null);
  const [year, setYear] = useState(null);

  const [dataList, setStudentList] = useState(courseData) 

  const setStatusFilter = Department => {
   
  if (dataList === courseData) {
      setStudentList([...courseData.filter(e => e.Department === Department)]);
  }
  else {
    setStudentList([...courseData.filter(e => e.Department === Department)]);
  }
  setDepartment(Department)
}

  const setSemesterFilter = Semester => {
  if (dataList === courseData) {
      setStudentList([...courseData.filter(e => e.Semester === Semester)]);
  }
  else {
    setStudentList([...courseData.filter(e => e.Semester === Semester)]);
  }
  setSemester(Semester)
  }

  const setYearFilter = Year => {
    if (dataList === courseData) {
      setStudentList([...courseData.filter(e => e.Year === Year)]);
  }
  else {
    setStudentList([...courseData.filter(e => e.Year === Year)]);
  }
  setYear(Year)
  }


  const [data,setData] =useState(courseData)

  const onChangeValue = (itemSelected, index) => {
    const newData = data.map(item => {
      if (item.id == itemSelected.id){
        return{
          ...item,
          selected:!item.selected
        }
      }
      return{
        ...item,
        selected: item.selected,
      }
    })
    setData(newData)
  }

  const renderItem = ({item, index}) => { 
    return (
    <View style={{marginTop:5}}>
        <View  key={index}  style={{flex: 1}}>
        <Text style = {style.textCC}>{item.Course_code}</Text>
        <Text style = {style.textCC1}>{item.Course_name}</Text>
        <Text style = {style.textCC1}>Time: {item.Time}</Text>
        <Text style = {style.textCC1}>Lecture Group: {item.Lecture_group}</Text>
        <Text style = {style.textCC1}>Tutorial Group: {item.Tutorial_group}</Text>
        <Text style = {style.textCC1}>Lecturer: {item.Lecturer_name}</Text>
        <Text style = {style.textCC1}>Location: {item.Place}</Text>
        <View style = {style.addButton}>

      {/*  <CheckBox
              disabled={false}
              onAnimationType='fill'
              offAnimationType='fade'
              boxType='square'
              //checked={!item}
              onPress={() => onChangeValue (item, index)}
              /> */}  

          <Icon
            name='plus'
            type='evilicon'
            color='#8bc34a' 
            size={40}
            onPress={() => onChangeValue (item, index)}
          />       
      </View>

        <View
            style={{
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 1,
              width: 380,
              alignSelf: 'center',
              marginTop:5,
            }}
        />
        </View>
    </View>
    )} 

const [modalOpenz, setModalOpensz] = useState(false);

/*Display selected course */
    const onPressShowItems =() =>{
      const listSelected = data.filter(item => item.selected == true);
      let contentAlert ='';
      listSelected.forEach(item => {
        contentAlert = contentAlert + "- " + item.Course_name + "\n"
      })
      Alert.alert(
        "Courses",
        contentAlert,
        );
    }

     const listSelected = data.filter(item => item.selected == true); 
     console.log(listSelected)

    return(
      <View style={{flex:1}}>
        <Header text="Course Scheduler"/>

        <View style ={style.plannercont}>
        <Pressable onPress={pressPlanner}>
              <View style={style.buttonSC}>
                <Text style={style.buttonText}>Course Planner</Text>
              </View>
        </Pressable>

          <TouchableOpacity
            //onPress= {pressHendlers}
            onPress={onPressShowItems}
            style={style.buttonSC}>
            <Text  style={style.buttonText}>Selected Course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            //onPress= {pressHendlers}
            onPress ={() =>  setModalOpensz (true)}
            style={style.buttonSC}>
            <Text  style={style.buttonText}>Timetable</Text>
          </TouchableOpacity>

          <Modal
              transparent ={true}
              visible={modalOpenz}
            >
              <View style={style.modalCont}>
                <View style={style.modalcont1}> 
                    <Text style={style.textDetail}>
                      Timetable
                    </Text>

{/*Timetable Planner*/}

                <View style ={{height: 615, paddingTop:10}}>
                <TimeTable
                  events={listSelected}
                  eventOnPress={(item) => Alert.alert( 
                    item.Course_code,
                      item.Course_name 
                     + "\n"+ "Credit hour: " + item.Credit_hour
                     + "\n"+ "Synopsis: " + item.Course_explanation
                       )}
                  />
                </View>
                    <View  style={style.closeinfocontainer}>
                        <Button 
                        color="steelblue"
                        title="Close"
                          onPress ={() => setModalOpensz (false)}
                        > 
                        </Button>
                    </View>
                </View>
              </View>
            </Modal>
        </View>

{/*grey line */}
        <View
              style={{
                borderBottomColor: 'lightgrey',
                borderBottomWidth: 1,
                marginTop: 5,
                width: 380,
                alignSelf: 'center',
                marginBottom:5
                }}
            />


{/* Year and semester*/}

<View style={{flexDirection: 'row'}}>
          <Icon
              style={{paddingLeft: 20, paddingTop:15}}
              name='calendar-alt'
              type='font-awesome-5'
              color='pink' 
              size={15}
            />
          <Text style={{paddingLeft: 10, paddingTop:15, marginRight: 5}} >Year:</Text>       

        <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
            <View style={style.listTab}>
              {
                Tabyear.map((e, index) =>(
                  <TouchableOpacity 
                  key={index}
                  style={[style.btnTab, 
                   year === e.Year && style.btnTabActive
                  ]}
                  onPress={() => setYearFilter(e.Year)}
                  >
                    <Text style={style.textTab}>{e.Year}</Text>
                  </TouchableOpacity>
                ))
              }

              {
                Tabsem.map((e, index) =>(
                  <TouchableOpacity 
                  key={index}
                  style={[style.btnTab, 
                   semester === e.Semester && style.btnTabActive
                  ]}
                  onPress={() => setSemesterFilter(e.Semester)}
                  >
                    <Text style={style.textTab}> Semester {e.Semester}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
        </ScrollView>   
        </View> 

{/* Department filter*/}
        <View style={{flexDirection: 'row'}}>
          <Icon
              style={{paddingLeft: 20, paddingTop:15}}
              name='building'
              type='font-awesome-5'
              color='#194d33' 
              size={15}
            />
          <Text style={{paddingLeft: 10, paddingTop: 15, marginRight: 5}} >Department:</Text>
          
        <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}>
            <View style={style.listTab}>
              {
                Tabdep.map((e, index) =>(
                  <TouchableOpacity 
                  key={index}
                  style={[style.btnTab, department === e.Department && style.btnTabActive]}
                  onPress={() => setStatusFilter(e.Department)}
                  >
                    <Text style={style.textTab}>{e.Department}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
        </ScrollView>
    </View>

          <FlatList
          data = {dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          />
      </View>
   
    )
  }
  
  const style = StyleSheet.create({

    closeinfocontainer:{
      width:200,
      height: 40,
      alignSelf: 'center',
    },

    infocontainer: {
      width:370,
      height: 40,
      alignSelf:'center',
      marginTop: 10
    },

    buttonText:{
      alignSelf: 'center',
      paddingTop: 9,
      fontSize: 14,
      color:'white'
    },

    textCC:{
      marginLeft: 50,
      marginTop: 5,
      fontSize: 13,
      fontWeight: 'bold'
    },

    textCC1:{
      marginLeft: 50,
      marginTop: 5,
      fontSize: 12,
    },

    addButton:{
      alignSelf:'flex-end',
      marginRight: 25
      },

    buttonSC:{
      width: 120,
      height: 40,
      borderRadius: 20,
      alignSelf: 'center',
      backgroundColor: '#6F8FAF',
      margin:5
    },
    plannercont:{
      marginTop: 5,  
      flexDirection:'row',
      alignSelf:'center'
    },

    listTab:{
      flexDirection:'row',
    },
    
    btnTab:{
      //width: Dimensions.get('window').width/1.9,
      paddingHorizontal:10,
      flexDirection:'row',
      borderWidth:1,
      borderColor:'#EBEBEB',
      paddingVertical:10,
      borderRadius:20,
      margin:5,
      height:38, 
    },
    
    textTab:{
      fontSize:12,
      color:'black',
    },
    
    btnTabActive:{
      backgroundColor:'steelblue'
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
      margin:10, 
      height:750, 
      borderRadius: 10
    },
    closeinfocontainer:{
      width:200,
      height: 40,
      alignSelf: 'center',
      marginTop: 50,  
    },
    
    textDetail:{
      fontSize: 15, 
      paddingTop: 20, 
      paddingLeft: 20,
      fontWeight: 'bold',
    },
  
    });
