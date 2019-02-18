import React, { Component } from 'react';
import {
  Container, Header, Content, Button, Icon, Text, View, Form, Item, Input, Label,
} from 'native-base';
import {
  StyleSheet, Alert, AsyncStorage, Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import deviceStorage from '../AsyncStorage/deviceStorage';
import axios from '../Axios/axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      username: '',
      password: '',
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const {
      username,
      password,
    } = this.state;

    const dataToSend = {
      username,
      password,
    };
    axios.post('api/users/login/', dataToSend)
      .then((response) => {
        const token = response.data.token;
        deviceStorage.saveItem('id_token', token);
        this.props.newJWT(token);
        this.props.sendFcmToken(token);
        Actions.insurance({ token });
      })
      .catch((error) => {
        console.log(error.response);
        Alert.alert(
          'Error',
          'Contraseña o correo electronico incorrectos.',
          [
            { text: 'Aceptar', onPress: () => {} },
          ],
          { cancelable: false },
        );
        console.log(error);
      });
  }

  render() {
    return (
      <Container style={styles.container}>
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
                  placeholderTextColor="rgba(255,255,255,.6)"
                  style={styles.textInput}
                  autoCapitalize="none"
                  borderColor="rgba(255,255,255,.6)"
                  onChangeText={username => this.setState({ username })}
                />
              </Item>
              <Item fixedLabel>
                <Input
                  placeholder="Contraseña"
                  placeholderTextColor="rgba(255,255,255,.6)"
                  style={styles.textInput}
                  borderColor="rgba(255,255,255,.6)"
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            </Form>
          </View>
          <View style={{ paddingLeft: 22, paddingRight: 25, paddingBottom: 20 }}>
            <Text style={styles.button_forget} onPress={() => Actions.forget()}>
              Olvidé mi Contraseña
            </Text>
          </View>
          <View style={{ paddingLeft: 22, paddingRight: 25, paddingBottom: 20 }}>
            <Button block danger style={styles.button} onPress={this.submit}>
              <Text>INICIAR SESIÓN</Text>
            </Button>
          </View>

          <View style={{ paddingLeft: 22, paddingRight: 25, paddingTop: 10 }}>
            <Button block transparent style={styles.button2} onPress={() => Actions.signUp()}>
              <Text style={{ color: 'white' }}>REGISTRARSE</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#192a56',
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
