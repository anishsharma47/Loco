//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/Navigations/Routes';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import { getData } from './src/utils/helperFunctions';
import { saveUserData } from './src/redux/reducers/auth';
import FlashMessage from 'react-native-flash-message';
import { textScale } from './src/styles/responsiveSize';

// create a component
const App = () => {
  const {dispatch}=store

  const initUser = async() =>{
      let data = await getData('userInfo')
      if (!!data) {
        dispatch(saveUserData(JSON.parse(data)));
      }
  }

  useEffect(() => { 
    try {
      initUser()
    } catch (error) {
      console.log("no data found",error) 
    }
  }, [])


  
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="top"  titleStyle={{
          fontSize: textScale(14)
        }}/>
    </Provider>
  );
};
 


//make this component available to the app
export default App;