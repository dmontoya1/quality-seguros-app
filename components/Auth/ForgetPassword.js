import React, { Component } from 'react';
import {
  Container, Header, Content, Button, Icon, Text, View, Form, Item, Input, Body, Left, Title, Right,
} from 'native-base';
import {
  StyleSheet, Alert, AsyncStorage, Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import deviceStorage from '../AsyncStorage/deviceStorage';
import axios from '../Axios/axios';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const {
      email,
    } = this.state;

    const dataToSend = {
      email,
    };
    console.log(dataToSend);
    if (email === '') {
      Alert.alert(
        'Correcto',
        'Hemos enviado las instrucciones a tu correo para que puedas recuperar la contraseña',
        [
          { text: 'Aceptar', onPress: () => Actions.logIn() },
        ],
        { cancelable: false },
      );
    } else {
      axios.post('api/users/password-reset/', dataToSend)
        .then((response) => {
          console.log(response.data);
          Alert.alert(
            'Correcto',
            'Hemos enviado las instrucciones a tu correo para que puedas recuperar la contraseña',
            [
              { text: 'Aceptar', onPress: () => Actions.logIn() },
            ],
            { cancelable: false },
          );
        })
        .catch((error) => {
          console.log(error.response);
          Alert.alert(
            'Error',
            error.response.data.error,
            [
              { text: 'Aceptar', onPress: () => {} },
            ],
            { cancelable: false },
          );
          console.log(error);
        });
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.container}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ color: '#000' }}>Recuperar contraseña</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Title />
          </Right>
        </Header>
        <Content>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/Quality-white.png')}
              style={styles.imageIntro}
            />
          </View>
          <View style={{ paddingLeft: 10, paddingRight: 30, alignContent: 'center' }}>
            <Form style={{ paddingBottom: 40 }}>
              <Item fixedLabel>
                <Input
                  keyboardType="email-address"
                  placeholder="Correo electrónico"
                  placeholderTextColor="rgba(0,0,0,.6)"
                  style={styles.textInput}
                  autoCapitalize="none"
                  borderColor="rgba(0,0,0,.6)"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
            </Form>
          </View>
          <View style={{ paddingLeft: 22, paddingRight: 25, paddingBottom: 20 }}>
            <Button block danger style={styles.button} onPress={this.submit}>
              <Text>Enviar</Text>
            </Button>
          </View>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    color: 'white',
    fontSize: 39,
    fontFamily: 'Pacifico-Regular',
    textAlign: 'center',
    paddingTop: 60,
    paddingBottom: 50,
  },
  button: {
    borderRadius: 10,
  },
  button2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  button_forget: {
    color: '#fff',
    textAlign: 'right',
  },
  textInput: {
    color: 'rgba(255,255,255,.6)',
  },
  imageContainer: {
    flex: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingTop: 60,
    paddingBottom: 50,
  },
  imageIntro: {
    flex: 1,
    height: 190,
    resizeMode: 'contain',
  },
});
