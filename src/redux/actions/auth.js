import {
  FILE_UPLOAD,
  LOGIN_API,
  OTP_VERIFY,
  SIGNUP_API,
} from '../../config/urls';
import {clearUserData, storeData} from '../../utils/helperFunctions';
import {apiPost} from '../../utils/utils';
import {saveUserData} from '../reducers/auth';
import store from '../store';
import types from '../types';
const {dispatch} = store;

export const userLogin = data => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then(res => {
        console.log('get res+++', res);
        if (!!res) {
          storeData('userInfo', res)
            .then(value => {
              console.log('im here');
              dispatch(saveUserData(res));
              resolve(res);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
  // dispatch(saveUserData(data));
};

export const userSignup = (data, headers) => {
  return apiPost(SIGNUP_API, data, headers);
};

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
  clearUserData();
}
