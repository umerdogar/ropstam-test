import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Card from '../../Components/Card/Card';
import {UserDetails} from '../../Services/APIs/API';
import ButtonBottom from '../../Components/CustomizeButton/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({navigation}) => {
  const [dataArray, setDataArray] = useState([]);
  const APIData = async () => {
    try {
      let response = await UserDetails();

      if (response?.status === 200) {
        setDataArray([...response?.data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const renderItem = ({item}) => (
    <Card title={item.title} Description={item.body} />
  );
  useEffect(() => {
    APIData();
  }, []);

  return (
    <View
      style={{
        flex: 1,

        alignItems: 'center',
        padding: hp(3),
        Width: '100%',
      }}>
      <View style={{width: '100%', height: hp(75)}}>
        <FlatList
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <ButtonBottom name="Log out" onPress={Logout} />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Home;
