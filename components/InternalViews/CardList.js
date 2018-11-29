import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, Alert, AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CardComponent from './CardComponent';

import axios from '../Axios/axios';

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      insurances: [],
      loading: true,
    };
    this.request = this.request.bind(this);

    AsyncStorage.getItem('id_token', (err, result) => {
      this.setState({
        token: result,
      });
    });
  }

  componentDidMount() {
    axios.get('api/insurances/')
      .then((response) => {
        this.setState(() => ({
          insurances: response.data,
          loading: false,
        }));
      });
  }

  request(id) {
    const { token } = this.state;
    axios.get(`api/insurances/detail/${id}/`)
      .then((response) => {
        const policy = response.data;
        if (policy.name === 'SOAT') {
          Actions.request({ policy, token });
        } else {
          console.log('ELSEEEE');
          Actions.requestInsurance({ policy, token });
        }
      })
      .catch((error) => {
        console.log('ERROR');
        Alert.alert(
          'Error',
          'Ha ocurrido un error. Intenta nuevamente',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
        console.log(error);
      });
  }

  render() {
    const loading = (
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="#020718" />
      </View>
    );
    const mappedInsurances = this.state.insurances.map(insurance => (
      <CardComponent
        key={insurance.id}
        id={insurance.id}
        name={insurance.name}
        category={insurance.category}
        image={insurance.image}
        request={this.request}

      />
    ));
    if (this.state.loading) {
      return loading;
    }

    return mappedInsurances;
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

});

export default CardList;
