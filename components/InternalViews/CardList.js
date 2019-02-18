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
      }).catch((error) => {
        // handle error
        console.log(error);
        console.log(error.response);
        this.setState(() => ({
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
          Actions.requestInsurance({ policy, token });
        }
      })
      .catch((error) => {
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
    const { insurances } = this.state;
    const mappedInsurances = insurances.map(insurance => (
      <CardComponent
        key={insurance.id}
        id={insurance.id}
        name={insurance.name}
        category={insurance.category}
        image={insurance.image}
        request={this.request}

      />
    ));
    const noInsurances = (

      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <Text style={styles.loaderText}>
            No hay coberturas disponibles en este momento.
            {'\n'}
            {'\n'}
            Intenta nuevamente más tarde
            {'\n'}
          </Text>
        </View>
      </View>
    );
    if (this.state.loading) {
      return loading;
    }

    if (insurances.length > 0) {
      return mappedInsurances;
    }

    return noInsurances;
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  loaderContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loader: {
    backgroundColor: '#fff',
    height: 250,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    color: '#05071e',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 20,
  },

});

export default CardList;
