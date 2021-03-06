import React, { Component } from 'react';
import {
  Container, CheckBox, Header, Left, Body, Right,
  Button, Icon, Title, Form, Item, Input, Label, View,
} from 'native-base';
import {
  StyleSheet, ScrollView, Text, Alert, KeyboardAvoidingView, Dimensions,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Actions } from 'react-native-router-flux';

import deviceStorage from '../AsyncStorage/deviceStorage';
import axios from '../Axios/axios';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      first_name: '',
      last_name: '',
      document_id: 0,
      phone_number: '',
      mail: '',
      mail2: '',
      password: '',
      password2: '',
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const {
      first_name,
      last_name,
      document_id,
      phone_number,
      mail,
      mail2,
      password,
      password2,
    } = this.state;

    if (password !== password2) {
      Alert.alert(
        'Error',
        'Las contraseñas no coinciden.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else if (mail2 !== mail) {
      Alert.alert(
        'Error',
        'Las direcciones de correo no coinciden.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else {
      const dataToSend = {
        first_name,
        last_name,
        document_id,
        phone_number,
        email: mail,
        username: mail,
        password,
      };
      console.log(dataToSend);
      if (this.state.checked) {
        axios.post('api/users/sign_up/', dataToSend)
          .then((response) => {
            Alert.alert(
              'Registro exitoso',
              'Ahora puedes solicitar tu SOAT y otros seguros a través de la aplicación y llevarlos en todo momento.',
              [
                { text: 'Aceptar', onPress: () => Actions.logIn() },
              ],
              { cancelable: false },
            );
          })
          .catch((error) => {
            console.warn(error.response);
            Alert.alert(
              'Error',
              error.response.data.error,
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
          });
      } else {
        Alert.alert(
          'Error',
          'Debes aceptar los terminos y condiciones.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
    }
  }

  render() {
    const { checked } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" style={{ color: '#000' }} />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={styles.title}>Registro</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Title style={styles.title} />
          </Right>
        </Header>

        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{
            height: 800
          }}>
          <KeyboardAvoidingView
            style={{
              paddingLeft: 10, paddingRight: 30, alignContent: 'center', paddingTop: 40,
            }}
            behavior="padding"
          >
            {/* <View style={{ alignContent: 'center', paddingLeft: 20 }}>
              <Text style={{ color: 'rgba(0,0,0,0.3)' }}> ────────────── ó ──────────────</Text>
            </View> */}
            <Form>
              <Item fixedLabel style={styles.input}>
                <Input
                  placeholder="Nombres"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={first_name => this.setState({ first_name })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  placeholder="Apellidos"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={last_name => this.setState({ last_name })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  keyboardType="numeric"
                  placeholder="Número de documento (Opcional)"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={document_id => this.setState({ document_id })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  keyboardType="number-pad"
                  placeholder="Celular de contacto"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={phone_number => this.setState({ phone_number })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  keyboardType="email-address"
                  placeholder="Correo electrónico"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  autoCapitalize="none"
                  onChangeText={mail => this.setState({ mail })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  keyboardType="email-address"
                  placeholder="Confirme su correo electrónico"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  autoCapitalize="none"
                  onChangeText={mail2 => this.setState({ mail2 })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  placeholder="Contraseña"
                  autoCapitalize="none"
                  secureTextEntry
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <Item fixedLabel style={styles.input}>
                <Input
                  placeholder="Confirmar contraseña"
                  secureTextEntry
                  autoCapitalize="none"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={password2 => this.setState({ password2 })}
                />
              </Item>
            </Form>
            <View style={styles.checkbox_container}>
              <View>
                <CheckBox
                  checked={checked}
                  color="#192a56"
                  onPress={() => this.setState({ checked: !checked })}
                />
              </View>
              <View style={{ paddingLeft: 30, textAlign: 'left', height: 70 }}>
                <Text>
                  Al continuar acepta nuestros
                  {' '}
                  {' '}
                  <Text style={{ fontWeight: 'bold' }} onPress={() => Actions.terms()}>
                    Términos y condiciones
                    {' '}
                    {' '}
                  </Text>
                  <Text>
                  y
                    {' '}
                    {' '}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }} onPress={() => Actions.policies()}>
                    Política de tratamiento de datos
                    {' '}
                    {' '}
                  </Text>
                </Text>

              </View>
            </View>
            <View style={{ justifyContent:'center', alignItems:'center', paddingLeft: 22, paddingRight: 10, paddingTop: 35 }}>
              <Button block danger style={styles.button} onPress={this.submit}>
                <Text style={{ color: 'white' }}>REGISTRARSE</Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999',
  },
  header: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
  },
  input: {
    paddingTop: 20,
  },
  input_end: {
    paddingBottom: 20,
  },
  text: {
    color: 'rgba(0,0,0,0.2)',
  },
  checkbox_container: {
    paddingTop: 40,
    paddingBottom: 30,
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
  },
});
