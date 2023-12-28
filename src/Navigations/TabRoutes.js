import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from './navigationStrings';
import * as Screen from '../Screens';
import {Image} from 'react-native';
import {height, moderateScaleVertical} from '../styles/responsiveSize';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: moderateScaleVertical(60),
          backgroundColor: colors.whiteColor,
        },
      }}
      initialRouteName={navigationStrings.HOMESCREEN}>
      <Tab.Screen
        options={{
          title: '',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                width={46}
                height={46}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_1280.png',
                }}
              />
            );
          },
        }}
        name={navigationStrings.HOMESCREEN}
        component={Screen.HomeScreen}
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;
