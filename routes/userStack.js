import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from "../screens/welcome";
import Register from "../screens/register";
import Login from "../screens/login";
import Verification from "../screens/verification";
import Homepage from "../screens/homepage";
import Profile from "../screens/profilePage/profile";
import editProfile from "../screens/profilePage/editProfile";
import Group from "../screens/groupPage/group";
import addGroup from "../screens/groupPage/addGroup";
import joinGroup from "../screens/groupPage/joinGroup";
import myDashboard from "../screens/dashboardPage/myDashboard";
import groupDashboard from "../screens/dashboardPage/groupDashboard";

const { Navigator, Screen } = createStackNavigator();

const UserStack = () => (
  <Navigator headerMode="none">
 {/* // other options: "float", "screen" */}
    <Screen name="Homepage" component={Homepage} />
    <Screen name="Profile" component={Profile} />
    <Screen name="EditProfile" component={editProfile} />
    <Screen name="Group" component={Group} />
    <Screen name="AddGroup" component={addGroup} />
    <Screen name="JoinGroup" component={joinGroup} />
    <Screen name="MyDashboard" component={myDashboard} />
    <Screen name="GroupDashboard" component={groupDashboard} />


  </Navigator>
);

export default UserStack;

// export const AuthNavigator = () => (
//   <NavigationContainer>
//     <HomeNavigator />
//   </NavigationContainer>
// );
