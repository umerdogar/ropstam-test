import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Src/Screens/Login/Login';
import Home from './Src/Screens/Home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const App = () => {
  const val = useRef(false);
  const [tokenn, setToken] = useState(val);

  console.log(tokenn, val, 'tokeennnnn');
  const TokenGetter = async () => {
    let token = await AsyncStorage.getItem('api_token');
    console.log(token, 'token dfgdfg');
    if (token === null) {
      console.log('null body');
      return true;
      // setToken(true);
    } else {
      console.log('else body');
      // setToken(false);
      return false;
    }
  };
  useEffect(() => {
    val.current = false;
  }, []);

  if (val.current === false) {
    console.log(tokenn, 'tokennnnn');
    console.log('Inside Ref body');
    TokenGetter().then(x => {
      console.log(x, 'xxxx in return ');
      setToken(x);
    });
  }

  return (
    <NavigationContainer>
      {console.log(tokenn, 'tokenn in  up stack Navigator')}
      <Stack.Navigator initialRouteName={tokenn ? 'Login' : 'Home'}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
