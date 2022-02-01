import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from "../screens/homepage";
import Profile from "../screens/profilePage/profile";
import editProfile from "../screens/profilePage/editProfile";
import resetPassword from "../screens/profilePage/resetPassword";
import submitFeedback from "../screens/profilePage/submitFeedback";
import Group from "../screens/groupPage/group";
import addGroup from "../screens/groupPage/addGroup";
import joinGroup from "../screens/groupPage/joinGroup";
import myDashboard from "../screens/dashboardPage/myDashboard";
import groupDashboard from "../screens/dashboardPage/groupDashboard";
import Calculator from "../screens/calculatorPage/calculator";
import CGPA from "../screens/calculatorPage/CGPA";
import GPA from "../screens/calculatorPage/GPA";
import SelfReminder from "../screens/reminderPage/selfReminder";
import Coursescheduler from "../screens/schedulerPage/courseScheduler";
import Mycourse from "../screens/schedulerPage/myCourse";
import Planner from "../screens/schedulerPage/planner";
import ISPlanner from "../screens/schedulerPage/isplanner";
import NetworkPlanner from "../screens/schedulerPage/networkplanner";
import SEPlanner from "../screens/schedulerPage/seplanner";
import AIPlanner from "../screens/schedulerPage/aiplanner";
import DSPlanner from "../screens/schedulerPage/dsplanner";
import MULPlanner from "../screens/schedulerPage/mulplanner";
import Timetable from "../screens/timetablePage/timetable";

const { Navigator, Screen } = createStackNavigator();

const UserStack = () => (
  <Navigator headerMode="none">
 {/* // other options: "float", "screen" */}
 <Screen name="Homepage" component={Homepage} />
    <Screen name="Profile" component={Profile} />
    <Screen name="EditProfile" component={editProfile} />
    <Screen name="ResetPassword" component={resetPassword} />
    <Screen name="SubmitFeedback" component={submitFeedback} />
    <Screen name="Group" component={Group} />
    <Screen name="AddGroup" component={addGroup} />
    <Screen name="JoinGroup" component={joinGroup} />
    <Screen name="MyDashboard" component={myDashboard} />
    <Screen name="GroupDashboard" component={groupDashboard} />
    <Screen name="Calculator" component={Calculator} />
    <Screen name="CGPA" component={CGPA} />
    <Screen name="GPA" component={GPA} />
    <Screen name="SelfReminder" component={SelfReminder} />
    <Screen name="Coursescheduler" component={Coursescheduler} />
    <Screen name="Mycourse" component={Mycourse} /> 
    <Screen name="Planner" component={Planner} /> 
    <Screen name="ISPlanner" component={ISPlanner} /> 
    <Screen name="NetworkPlanner" component={NetworkPlanner} /> 
    <Screen name="DSPlanner" component={DSPlanner} /> 
    <Screen name="MULPlanner" component={MULPlanner} /> 
    <Screen name="SEPlanner" component={SEPlanner} /> 
    <Screen name="AIPlanner" component={AIPlanner} /> 
    <Screen name="Timetable" component={Timetable} />

  </Navigator>
);

export default UserStack;

// export const AuthNavigator = () => (
//   <NavigationContainer>
//     <HomeNavigator />
//   </NavigationContainer>
// );
