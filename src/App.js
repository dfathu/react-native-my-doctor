import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import { Loading } from './components';
import store from './redux/store';
import Router from './router';

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  LogBox.ignoreAllLogs(true);
  // ** menampilkan hasil dari state Global yang dibuat
  // console.log('state Global :', stateGlobal);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {/* <GetStarted /> */}
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading/>}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
