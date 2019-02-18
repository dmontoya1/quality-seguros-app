import React, { Component } from 'react';
import {
  Container, Header, Left, Body, Right, Button, Icon, Title, View,
} from 'native-base';
import {
  StyleSheet, ScrollView, Text, ActivityIndicator,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import axios from '../Axios/axios';


export default class Policies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: {},
      loader: true,
    };
  }

  componentDidMount() {
    axios.get('api/manager/privacy-policies/')
      .then((response) => {
        this.setState(() => ({
          term: response.data[0],
          loader: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const loading = (
      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <Text style={styles.loaderText}>
            Estamos cargando las politicas...
            {'\n'}
            Espera un momento por favor...
          </Text>
          <ActivityIndicator size="large" color="#999" />
        </View>
      </View>
    );
    const { term } = this.state;
    if (this.state.loader) {
      return loading;
    }
    return (
      <Container>
        <Header style={styles.container}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ color: '#fff' }}>{term.name}</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Title />
          </Right>
        </Header>
        <ScrollView>

          <Text style={styles.terms}>
            {term.text}
          </Text>

        </ScrollView>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05071e',
  },
  input: {
    backgroundColor: 'rgb(250,250,250)',
    borderBottomColor: '#05071e',
    paddingLeft: 20,
  },
  container_form: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  container_input: {
    flexDirection: 'row',
    paddingLeft: -5,
    paddingTop: 20,
    paddingRight: 40,
  },
  terms: {
    padding: 10,
    textAlign: 'justify',
    fontSize: 16,
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
