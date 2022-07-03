import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import TextInputCustom from '../../Components/TextInput/TextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonBottom from '../../Components/CustomizeButton/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginUser} from '../../Services/APIs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [Password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const [ErrorForPassword, setErrorForPassword] = useState('');
  const [ErrorForServer, setErrorForServer] = useState('');
  const [hidePass, sethidePass] = useState(false);

  const passwordHideHandler = () => {
    sethidePass(!hidePass);
  };

  const ValidateEmailandPassword = async (mail, Password) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) &&
      Password.length > 7
    ) {
      setError('');
      setErrorForPassword('');
      try {
        let response = await LoginUser(mail, Password);
        console.log(response, 'response');
        if (response?.data?.meta?.status === 200) {
          let token = response.data?.data?.access_token;
          await AsyncStorage.setItem('api_token', token);
          console.log(response?.data, 'response.data');
          navigation.navigate('Home');
          setErrorForServer('');
        } else {
          setErrorForServer('Server Request Failed');
        }
      } catch (e) {
        console.log(e, 'erro');
        setErrorForServer('Server Request Failed');
      }
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setError('');
    } else {
      setError('Invalid Email Address');
    }
    if (Password.length > 7) {
      setErrorForPassword('');
    }

    if (Password.length <= 7) {
      setErrorForPassword('Please Enter a Valid Password');
    }
  };
  useEffect(async () => {
    const token = await AsyncStorage.getItem('api_token');
    console.log(token, 'token');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        marginTop: hp(10),
        alignItems: 'center',
        paddingHorizontal: wp(10),
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 22,

          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'Montserrat',
        }}>
        Hello Again!
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          marginTop: hp(1),
          //   fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'Montserrat',
        }}>
        chance To get your
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 20,

          //   fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'Montserrat',
        }}>
        life better
      </Text>

      <TextInputCustom
        onChangeText={onChangeText}
        value={text}
        width="100%"
        marginTop={hp(5)}
        PlaceHolder="Enter Username"
        borderRadius={16}
        borderWidth={1}
      />

      {Error.length > 0 && (
        <Text style={{color: 'red', alignSelf: 'flex-start'}}> {Error}</Text>
      )}
      <View
        style={{
          width: '100%',
          borderWidth: 1,
          marginTop: hp(2),
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 16,
          borderColor: '#979BB5',
        }}>
        <TextInputCustom
          onChangeText={setPassword}
          value={Password}
          width="85%"
          marginTop={hp(0)}
          PlaceHolder="Password"
          hidePass={hidePass}
        />

        <View
          style={{
            width: '15%',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={passwordHideHandler}>
            <Feather
              name={hidePass ? 'eye-off' : 'eye'}
              type=""
              color={'#000'}
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
      {ErrorForPassword.length > 0 && (
        <Text style={{color: 'red', alignSelf: 'flex-start'}}>
          {' '}
          {ErrorForPassword}
        </Text>
      )}

      <Text style={{alignSelf: 'flex-end', marginTop: hp(1)}}>
        Recoovery Passeword
      </Text>

      <ButtonBottom
        onPress={() => {
          ValidateEmailandPassword(text, Password);
        }}
        name="Login"
      />
      {ErrorForServer.length > 0 && (
        <Text style={{color: 'red'}}> {ErrorForServer}</Text>
      )}

      <Text style={{marginTop: hp(1.5)}}>or Continue with</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '75%',
          justifyContent: 'space-around',
          marginTop: hp(3),
        }}>
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 8, padding: 8}}>
          <Icon style={styles.icon_style} name="apple" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 8, padding: 8}}>
          <Icon style={styles.icon_style} name="google" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 8, padding: 8}}>
          <Icon style={styles.icon_style} name="facebook" size={30} />
        </TouchableOpacity>
      </View>

      <Text style={{marginTop: hp(3)}}>
        Not a member? <Text style={{color: '#57C84D'}}>Register now</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Login;
