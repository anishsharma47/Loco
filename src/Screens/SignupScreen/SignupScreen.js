//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import WrapperComp from '../../components/WrapperComp';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import validator from '../../utils/vailidations';
import ButtonComp from '../../components/ButtonComp';
import TextInputComp from '../../components/TextInputComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showError, showSucess} from '../../utils/helperFunctions';
import ImagePicker from 'react-native-image-crop-picker';
import navigationStrings from '../../Navigations/navigationStrings';
import axios from 'axios';
import {getPathFromState} from '@react-navigation/native';
import imagePath from '../../constants/imagePath';
import {userSignup} from '../../redux/actions/auth';

// create a component
const SignupScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [profile_picture, setProfile_Picture] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getNameFromPath = path => {
    // return ''
    return path?.split('/')?.splice(-1)?.[0];
  };

  const formData = new FormData();
  formData.append('name', fullName);
  formData.append('email', email);
  formData.append('age', age);
  formData.append('password', password);
  formData.append('profile_picture', {
    uri: profile_picture?.path,
    name: getNameFromPath(profile_picture?.path),
    type: profile_picture?.mime,
  });

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function cameraPermission() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
  }

  useEffect(() => {
    cameraPermission();
  }, []);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setProfile_Picture(image)
      })
      .catch(err => console.log(err));
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfile_Picture(image);
    });
  };

  const isValidData = () => {
    const error = validator({age, fullName, email, password, profile_picture});
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const signUp = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      try {
        const res = await userSignup(formData, {
          'Content-Type': 'multipart/form-data;',
        });
        console.log('signup api res', res);
        setLoading(false);
        showSucess('you register successfully please login');
        navigation.navigate(navigationStrings.LOGINSCREEN);
      } catch (error) {
        console.log('error in signUp api', error);
        showError(error?.error);
        setLoading(false);
      }
    }
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View style={{flex: 0.3}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
      </View>

      <View
        style={{
          flex: 0.7,
          backgroundColor: colors.whiteColor,
          borderRadius: moderateScale(20),
          marginTop: moderateScaleVertical(-20),
          padding: moderateScale(20),
          justifyContent: 'space-between',
        }}>
        <KeyboardAwareScrollView>
          <View>
            <Text
              style={{
                fontSize: textScale(26),
                color: colors.blackColor,
                fontWeight: 'bold',
              }}>
              Signup
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: moderateScaleVertical(20),
              }}>
              <Image
                width={moderateScale(80)}
                height={moderateScale(80)}
                source={{
                  uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png',
                }}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingHorizontal: moderateScale(10),
                }}>
                <Text
                  style={{color: colors.blackColor, fontSize: textScale(18)}}>
                  Profile Picture
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'flex-end',
                  }}>
                  <ButtonComp
                    textStyle={{
                      color: colors.blackColor,
                      fontSize: textScale(14),
                    }}
                    style={{
                      height: moderateScale(40),
                      flex: 0.5,
                      borderRadius: moderateScale(10),
                      backgroundColor: colors.gray8,
                      ...styles.boxWithShadow,
                      marginRight: moderateScaleVertical(10),
                    }}
                    onPress={() => openCamera()}
                    text="Take Picture"
                  />
                  <ButtonComp
                    textStyle={{
                      color: colors.blackColor,
                      fontSize: textScale(14),
                    }}
                    style={{
                      height: moderateScale(40),
                      flex: 0.5,
                      borderRadius: moderateScale(10),
                      backgroundColor: colors.gray8,
                      ...styles.boxWithShadow,
                    }}
                    onPress={() => openGallery()}
                    text="Upload"
                  />
                </View>
                <View></View>
              </View>
            </View>

            <View style={{marginTop: moderateScaleVertical(20)}}>
              <TextInputComp
                value={fullName}
                inputStyle={{...styles.boxWithShadow, ...styles.inputStyle}}
                placeholder="Name"
                onChangeText={value => setFullName(value)}
              />
              <TextInputComp
                value={email}
                inputStyle={{...styles.boxWithShadow, ...styles.inputStyle}}
                placeholder="Email"
                onChangeText={value => setEmail(value)}
              />
              <TextInputComp
                value={password}
                inputStyle={{...styles.boxWithShadow, ...styles.inputStyle}}
                placeholder="Password"
                onChangeText={value => setPassword(value)}
              />
              <TextInputComp
                value={age}
                inputStyle={{...styles.boxWithShadow, ...styles.inputStyle}}
                placeholder="Age"
                keyboardType="numeric"
                onChangeText={value => setAge(value)}
              />
            </View>
          </View>
          <ButtonComp
            isLoading={isLoading}
            text="Create Account"
            onPress={() => signUp()}
          />
        </KeyboardAwareScrollView>
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
export default SignupScreen;
