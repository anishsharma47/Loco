//import liraries
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
// create a component
const Routes = () => {
  const userData = useSelector(state => state.auth.userData);
  console.log('userData', userData);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!!userData?.token ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
