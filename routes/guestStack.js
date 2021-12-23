import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from "../screens/welcome";
import Register from "../screens/register";
import Login from "../screens/login";

const { Navigator, Screen } = createStackNavigator();

const GuestStack = () => (
  <Navigator headerMode="none">
 {/* // other options: "float", "screen" */}
    <Screen name="Welcome" component={Welcome} />
    <Screen name="Register" component={Register} />
    {/* <Screen name="Verification" component={Verification} /> */}
    <Screen name="Login" component={Login} />
  </Navigator>
);

export default GuestStack;

// export const GuestNavigator = () => (
//   <NavigationContainer>
//     <WelcomeNavigator />
//   </NavigationContainer>
// );
