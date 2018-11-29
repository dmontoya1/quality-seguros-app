import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import InsuranceComponent from './InsuranceComponent';


class InsurancesList extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const loading = (
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" color="#020718" />
      </View>
    );
    const { policies } = this.props;
    const mappedPolicies = policies.map(police => (

      <InsuranceComponent
        key={police.id}
        id={police.id}
        name={police.insurance_request != null ? police.insurance_request.insurance.name : police.insurance.name}
        insurer={police.insurer}
        pdfUrl={police.insurance_file_url}
        plate={police.licensed_plate}
        expirationDate={police.expiration_date}
      />
    ));
    if (this.state.loading) {
      return loading;
    }

    return mappedPolicies;
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

});

export default InsurancesList;
