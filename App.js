import React, { Component } from 'react';
import {
  StyleSheet, AsyncStorage, Alert, PermissionsAndroid, StatusBar,
} from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import IntroView from './components/IntroView/IntroView';
import Login from './components/Auth/Login';
import ForgetPassword from './components/Auth/ForgetPassword';
import SignUp from './components/Auth/Sign_up';
import Terms from './components/Auth/Terms';
import Policies from './components/Auth/Policies';
import Dashboard from './components/InternalViews/Dashboard';
import Profile from './components/InternalViews/Profile/Profile';
import ProfileEdit from './components/InternalViews/Profile/Profile_edit';
import UserInsurance from './components/Insurances/UserInsurances';
import Request from './components/Insurances/Request_insurer';
import RequestInsurance from './components/Insurances/RequestInsurance';
import UserRequest from './components/Insurances/UserRequests';
import InsurancePDF from './components/Insurances/Insurance/InsurancePDF';
import RequestPickUp from './components/Insurances/Request/RequestPickUp';

import axios from './components/Axios/axios';

import deviceStorage from './components/AsyncStorage/deviceStorage';

console.disableYellowBox = ['Remote Debugger'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      stepper: false,
      fcmToken: '',
    };

    this.newJWT = this.newJWT.bind(this);
    this.sendFcmToken = this.sendFcmToken.bind(this);
    this.stepperComplete = this.stepperComplete.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadStepper = deviceStorage.loadStepper.bind(this);
    this.loadJWT();
    this.loadStepper();
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    this.requestCallPermission();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }


  async getToken() {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
          this.setState({
            fcmToken,
          });
        }
      }
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  // 2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async requestCallPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: 'Permisos para realizar llamadas',
          message: 'Necesitamos permisos para poder realizar llamadas '
                     + 'de emergencia.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      console.log(notificationOpen);
      console.log(title);
      console.log(body);
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log(title);
      console.log(body);
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      // process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'Aceptar', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  newJWT(jwt) {
    state = {};
    this.setState({
      jwt,
    });
  }

  stepperComplete() {
    this.setState({
      stepper: true,
    });
  }

  async sendFcmToken(token) {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.post('api/devices/', {
      registration_id: fcmToken,
      type: 'android',
    })
      .then((response) => {
        console.log('device-registered');
      })
      .catch((error) => {
        console.log('error registering device');
        console.log(error.response.data);
      });
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="intro"
            component={IntroView}
            hideNavBar
            stepperComplete={this.stepperComplete}
            initial={!this.state.stepper && !this.state.jwt}
          />
          <Scene
            key="logIn"
            component={Login}
            hideNavBar
            newJWT={this.newJWT}
            sendFcmToken={this.sendFcmToken}
            initial={this.state.stepper && !this.state.jwt}
          />
          <Scene
            key="signUp"
            component={SignUp}
            hideNavBar
            newJWT={this.newJWT}
          />
          <Scene
            key="forget"
            component={ForgetPassword}
            hideNavBar
            newJWT={this.newJWT}
          />
          <Scene
            key="terms"
            component={Terms}
            hideNavBar
            newJWT={this.newJWT}
          />
          <Scene
            key="policies"
            component={Policies}
            hideNavBar
            newJWT={this.newJWT}
          />
          <Scene
            key="insurance"
            component={UserInsurance}
            hideNavBar
            token={this.state.jwt}
            deleteJWT={this.deleteJWT}
            initial={this.state.stepper && this.state.jwt}
          />
          <Scene
            key="home"
            component={Dashboard}
            hideNavBar
            token={this.state.jwt}
            deleteJWT={this.deleteJWT}
          />
          <Scene key="profile" component={Profile} hideNavBar />
          <Scene key="profile_edit" component={ProfileEdit} hideNavBar />
          <Scene key="request" component={Request} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="userRequest" component={UserRequest} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="requestInsurance" component={RequestInsurance} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="insurance_pdf" component={InsurancePDF} hideNavBar />
          <Scene key="requestPickup" component={RequestPickUp} hideNavBar />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
