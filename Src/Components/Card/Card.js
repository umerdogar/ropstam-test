import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Card = ({title, Description}) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        height: hp(24),
        borderRadius: 16,
        elevation: 5,
        marginVertical: hp(1),
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 22,

          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'Montserrat',
        }}>
        {title}
      </Text>
      <Text>{Description}</Text>
    </View>
  );
};

export default Card;
