import React from 'react';
import navigationStrings from './navigationStrings';
import * as Screens from '../Screens';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.INITIALSCREEN}
        component={Screens.InitialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.LOGINSCREEN}
        component={Screens.LoginScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.SIGNUPSCREEN}
        component={Screens.SignupScreen}
        options={{headerShown: false}}
      />
    </>
  );
}
