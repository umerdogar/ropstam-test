import React from 'react';
import {
  StyleProp,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ButtonBottom = ({name, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnSign_in]}>
      <Text style={styles.btnSign_text}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnSign_in: {
    backgroundColor: '#57C84D',
    padding: 14,
    width: '100%',
    borderRadius: 16,
    marginTop: 50,
  },
  btnSign_text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
});
export default ButtonBottom;
