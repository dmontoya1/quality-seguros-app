import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator,
} from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import IntroView from './components/IntroView/IntroView';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Sign_up';
import Dashboard from './components/InternalViews/Dashboard';
import Profile from './components/InternalViews/Profile/Profile';
import ProfileEdit from './components/InternalViews/Profile/Profile_edit';
import Insurance from './components/Insurances/Insure_Bought';
import Request from './components/Insurances/Request_insurer';
import RequestInsurance from './components/Insurances/RequestInsurance';
import UserRequest from './components/Insurances/UserRequests';
import InsurancePDF from './components/Insurances/Insurance/InsurancePDF';

import deviceStorage from './components/AsyncStorage/deviceStorage';

console.disableYellowBox = ['Remote Debugger'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: '',
      stepper: false,
    };

    this.newJWT = this.newJWT.bind(this);
    this.stepperComplete = this.stepperComplete.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadStepper = deviceStorage.loadStepper.bind(this);
    this.loadJWT();
    this.loadStepper();
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

  render() {
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
            initial={this.state.stepper && !this.state.jwt}
          />
          <Scene
            key="signUp"
            component={SignUp}
            hideNavBar
            newJWT={this.newJWT}
          />
          <Scene
            key="home"
            component={Dashboard}
            hideNavBar
            initial={this.state.stepper && this.state.jwt}
            deleteJWT={this.deleteJWT}
          />
          <Scene key="profile" component={Profile} hideNavBar />
          <Scene key="profile_edit" component={ProfileEdit} hideNavBar />
          <Scene key="insurance" component={Insurance} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="request" component={Request} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="userRequest" component={UserRequest} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="requestInsurance" component={RequestInsurance} hideNavBar deleteJWT={this.deleteJWT} />
          <Scene key="insurance_pdf" component={InsurancePDF} hideNavBar />
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
