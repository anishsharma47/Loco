//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Modal,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import WrapperComp from '../../components/WrapperComp';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {useSelector} from 'react-redux';
import ButtonComp from '../../components/ButtonComp';
import {logout} from '../../redux/actions/auth';
import Geolocation from 'react-native-geolocation-service';
import {ADD_COORDINATES, GET_USER_INFO} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';

// create a component
const HomeScreen = () => {
  const {userData} = useSelector(state => state.auth);
  const [modalVisibility, setModalvisibility] = useState(false);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const requestLocationPermission = async () => {
    setIsLoading(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getLocation();
        setModalvisibility(false);
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = async () => {
    new Promise((resolve, reject) => {
      resolve();
    })
      .then(() => {
        Geolocation.getCurrentPosition(
          position => {
            let latitude = position?.coords?.latitude;
            let longitude = position?.coords?.longitude;
            setLatitude(latitude);
            setLongitude(longitude);
            console.log('coords will be set', position.coords.latitude);
            setTimeout(() => {
              addCoordinates({
                coordinates: {
                  latitude,
                  longitude,
                },
              });
            }, 1000);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      })
      .catch(error => {
        console.log('some error occur');
      });
  };

  const addCoordinates = async data => {
    return new Promise((resolve, reject) => {
      apiPost(ADD_COORDINATES, data, {'x-auth-token': `${userData?.token}`})
        .then(res => {
          console.log('cordinates added', res);
          getuserinfo();
          setIsLoading(false);
        })
        .catch(error => {
          reject(error);
        });
    });
    // dispatch(saveUserData(data));
  };

  const getuserinfo = async () => {
    console.log('userinfo func >>>>');
    return new Promise((resolve, reject) => {
      apiGet(GET_USER_INFO, null, {'x-auth-token': `${userData?.token}`})
        .then(res => {
          setUserInfo(res);
          console.log('userinfo', res);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (!userInfo?.coordinates) {
      setModalvisibility(true);
    }
  }, []);

  function renderItem() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.gray8,
          borderRadius: moderateScale(20),
          flexDirection: 'row',
          padding: moderateScale(10),
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: moderateScaleVertical(10),
        }}>
        <Text style={{...styles.textStyle, fontSize: textScale(16)}}>
          place visited
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.blackColor,
            padding: moderateScale(4),
            paddingHorizontal: moderateScale(30),
            borderRadius: moderateScale(20),
          }}>
          <Text style={{...styles.textStyle, fontSize: textScale(16)}}>5</Text>
        </View>
      </View>
    );
  }

  return (
    <WrapperComp style={styles.container}>
      {modalVisibility ? (
        <ModalComp
          setModalvisibility={setModalvisibility}
          requestLocationPermission={requestLocationPermission}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : null}

<View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
      {isLoading ? (
        <ActivityIndicator color={colors.redColor} size={'large'} />
      ) : (
        <View style={{width:'100%',height:'100%', justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: moderateScaleVertical(20),
            }}>
            <Image
              style={{
                width: moderateScale(120),
                height: moderateScale(120),
                borderRadius: moderateScale(60),
              }}
              source={{uri: userData?.user?.image_url}}
            />
            <Text style={{...styles.textStyle, fontSize: textScale(24)}}>
              {userInfo?.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{marginRight: moderateScale(10), ...styles.textStyle}}>
                {userInfo?.coordinates?.latitude}
              </Text>
              <Text style={{...styles.textStyle}}>
                {userInfo?.coordinates?.longitude}
              </Text>
            </View>
          </View>

          <View style={styles.boxWithShadow}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                ...styles.boxWithShadow,
                paddingHorizontal: moderateScale(0),
              }}>
              <View style={{flex: 0.6}}>
                <ScrollView horizontal>
                  <Text style={{...styles.textStyle, fontSize: textScale(20)}}>
                    {userInfo?.email}
                  </Text>
                </ScrollView>
                <Text style={{...styles.textStyle}}>EMAIL</Text>
              </View>

              <View style={{}}>
                <Text style={{...styles.textStyle, fontSize: textScale(20)}}>
                  {userInfo?.age}
                </Text>
                <Text style={{...styles.textStyle}}>AGE</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      </View>

      <View style={{flex: 0.5}}>
        <Text style={{...styles.textStyle, fontWeight: 'bold'}}>
          General Statistics
        </Text>

        <View style={{marginTop: moderateScaleVertical(10)}}>
          <FlatList data={[{}, {}, {}, {}, {}, {}]} renderItem={renderItem} />
        </View>
      </View>
    </WrapperComp>
  );
};

const ModalComp = ({
  setModalvisibility,
  requestLocationPermission,
  isLoading,
  setIsLoading = () => {},
}) => {
  const logoutUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
    }, 2000);
    setIsLoading(false);
    setModalvisibility(false);
  };
  return (
    <Modal
      transparent={true}
      animationType="fade"
      style={{justifyContent: 'center'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.8)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: moderateScale(320),
            backgroundColor: colors.whiteColor,
            padding: moderateScale(20),
            borderRadius: moderateScale(20),
            shadowColor: colors.gray4,
            elevation: 5,
          }}>
          <Text style={{color: colors.redColor, fontSize: textScale(18)}}>
            Location Permission Required
          </Text>
          <Text
            style={{
              color: colors.blackColor,
              letterSpacing: textScale(1),
              marginVertical: moderateScaleVertical(10),
            }}>
            You need to allow the app to fetch your location to use
            Loco,otherwise you will be logged out
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ButtonComp
              textStyle={{fontSize: textScale(13)}}
              style={{height: 'auto', padding: moderateScale(6)}}
              text="Allow Location"
              onPress={() => requestLocationPermission()}
              isLoading={isLoading}
            />
            <ButtonComp
              textStyle={{fontSize: textScale(13)}}
              style={{
                height: 'auto',
                padding: moderateScale(6),
                backgroundColor: colors.redColor,
              }}
              isLoading={isLoading}
              onPress={() => logoutUser()}
              text="Logout"
            />
          </View>
        </View>
      </View>
    </Modal>
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
  textStyle: {
    color: colors.blackColor,
    fontWeight: '400',
  },
  boxWithShadow: {
    padding: moderateScale(10),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray8,
  },
});

//make this component available to the app
export default HomeScreen;
