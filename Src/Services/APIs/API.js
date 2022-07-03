import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const REACT_APP_API_URL = 'http://3.68.70.27';
const device_token = 'zasdcvgtghnkiuhgfde345tewasdfghjkm';
export const LoginUser = (Email, password) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `http://buddy.ropstambpo.com/api/login`,
      params: {
        email: Email,
        password: password,
        device_token: device_token,
      },
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const UserDetails = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/Posts`,
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
