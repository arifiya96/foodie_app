import React from 'react';
import AppNavigator from './navigation/app_navigation';
import firebaseConfig from './api_keys/api';
import * as firebase from 'firebase';

//Initialise firebase
firebase.initializeApp(firebaseConfig);

export default App = () => {
  return (
    <AppNavigator></AppNavigator>
  );
}
