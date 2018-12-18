import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, Alert, AsyncStorage,
} from 'react-native';
import InsuranceComponent from './InsuranceComponent';

import axios from '../../Axios/axios';


class InsurancesList extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      policies: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { token } = this.props;
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.get('api/insurances/customer/policy/detail/')
      .then((response) => {
        this.setState(() => ({
          policies: response.data,
          loading: false,
        }));
      });
  }

  render() {
    const loading = (

      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <Text style={styles.loaderText}>
            Estamos cargando tus seguros.
            {'\n'}
            Espera un momento por favor...
          </Text>
          <ActivityIndicator size="large" color="#999" />
        </View>
      </View>
    );
    const { policies } = this.state;
    const mappedPolicies = policies.map(police => (
      <InsuranceComponent
        key={police.id}
        id={police.id}
        name={police.insurance_request != null ? police.insurance_request.insurance.name : police.insurance.name}
        insurer={police.insurer}
        pdfUrl={police.insurance_file_url}
        plate={police.licensed_plate}
        expirationDate={police.expiration_date}
        police_number={police.police_number}
        adviser_phone={police.adviser_cellphone}
      />
    ));
    const noPolicies = (

      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <Text style={styles.loaderText}>
            No tienes pólizas vigentes
            {'\n'}
            {'\n'}
            Para solicitar una nueva póliza dirigete
            {'\n'}
             a 'Nuevas coberturas'
          </Text>
        </View>
      </View>
    );
    if (this.state.loading) {
      return loading;
    }

    if (policies.length > 0) {
      return mappedPolicies;
    }

    return noPolicies;
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

export default InsurancesList;
