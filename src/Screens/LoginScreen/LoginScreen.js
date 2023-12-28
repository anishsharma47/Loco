//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import ButtonComp from '../../components/ButtonComp';
import TextInputComp from '../../components/TextInputComp';
import {showError} from '../../utils/helperFunctions';
import validator from '../../utils/vailidations';

import {userLogin} from '../../redux/actions/auth';

// create a component
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const isValidData = () => {
    const error = validator({
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      try {
        const res = await userLogin({
          email,
          password,
        });
        console.log('login api res', res);
        setLoading(false);
      } catch (error) {
        console.log('error in login api', error);
        showError(error?.error);
        setLoading(false);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.5}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
      </View>

      <View
        style={{
          flex: 0.5,
          backgroundColor: colors.whiteColor,
          borderRadius: moderateScale(20),
          marginTop: moderateScaleVertical(-20),
          padding: moderateScale(20),
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontSize: textScale(26),
              color: colors.blackColor,
              fontWeight: 'bold',
            }}>
            Login
          </Text>

          <View style={{marginTop: moderateScaleVertical(20)}}>
            <TextInputComp
              placeholderTextColor={colors.blackColor}
              inputStyle={{...styles.boxWithShadow, ...styles.inputStyle}}
              placeholder="Email"
              onChangeText={value => setEmail(value)}
              value={email}
            />
            <TextInputComp
              placeholderTextColor={colors.blackColor}
              inputStyle={{...styles.boxWithShadow, ...styles.inputStyle}}
              placeholder="Password"
              onChangeText={value => setPassword(value)}
              value={password}
            />
          </View>
        </View>

        <ButtonComp
          text="Login"
          style={{borderRadius: moderateScale(50)}}
          onPress={() => onLogin()}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  inputStyle: {
    backgroundColor: colors.whiteColor,
    marginVertical: moderateScaleVertical(4),
    borderRadius: moderateScale(50),
  },
});

//make this component available to the app
export default LoginScreen;
