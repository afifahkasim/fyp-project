import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from "../screens/welcome";
import Register from "../screens/register";
import Login from "../screens/login";
import Verification from "../screens/verification";
import Homepage from "../screens/homepage";
import Profile from "../screens/profile";
import editProfile from "../screens/editProfile";
import Group from "../screens/group";
import addGroup from "../screens/addGroup";
import joinGroup from "../screens/joinGroup";
import myDashboard from "../screens/myDashboard"

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

  </Navigator>
);

export default UserStack;

// export const AuthNavigator = () => (
//   <NavigationContainer>
//     <HomeNavigator />
//   </NavigationContainer>
// );
