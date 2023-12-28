//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import WrapperComp from '../../components/WrapperComp';
import colors from '../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import ButtonComp from '../../components/ButtonComp';
import navigationStrings from '../../Navigations/navigationStrings';

// create a component
const InitialScreen = ({navigation}) => {
  function login() {
    navigation.navigate(navigationStrings.LOGINSCREEN);
  }

  async function signUp() {
    navigation.navigate(navigationStrings.SIGNUPSCREEN);
  }

  return (
    <WrapperComp>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingVertical: moderateScaleVertical(20),
        }}>
        <Text style={styles.heading}>Loco</Text>
        <Text style={styles.subHeading}>
          Track your Location in real-time with Loco
        </Text>
      </View>

      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={imagePath.img1} />
      </View>

      <View
        style={{
          marginBottom: 0,
          flex: 0.4,
          justifyContent: 'center',
          gap: moderateScaleVertical(20),
        }}>
        <ButtonComp text="Sign up" onPress={() => signUp()} />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: colors.gray3, letterSpacing: 1}}>
            Already have an account?
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => login()}>
            <Text
              style={{color: colors.blackColor, marginLeft: moderateScale(6)}}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperComp>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  heading: {
    color: colors.orangeColor,
    fontSize: textScale(30),
    fontWeight: 'bold',
  },
  subHeading: {
    color: colors.gray3,
    letterSpacing: 1,
  },
});

//make this component available to the app
export default InitialScreen;
