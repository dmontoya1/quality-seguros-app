import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import RequestComponent from './RequestComponent';


class RequestList extends Component {
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
    const { requests, token } = this.props;
    const mappedPolicies = requests.map(request => (
      <RequestComponent
        key={request.id}
        id={request.id}
        insurance_name={request.insurance.name}
        status={request.status}
        adviser_code={request.adviser_code}
        broker={request.broker}
        request_code={request.request_code}
        price={request.price}
        requests={requests}
        token={token}
      />
    ));

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

export default RequestList;
