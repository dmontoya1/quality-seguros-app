import React, { Component } from 'react';
import {
  Container, Header, Footer, Left, Body, Right, Button, Icon, Title, Text, Input, Item, Label, View,
} from 'native-base';
import {
  Image, StyleSheet, ScrollView, Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import axios from '../../Axios/axios';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      first_name: this.props.profile_data.first_name,
      last_name: this.props.profile_data.last_name,
      email: this.props.profile_data.email,
      email2: this.props.profile_data.email,
      username: this.props.profile_data.username,
      phone_number: this.props.profile_data.phone_number,
    };

    this.submit = this.submit.bind(this);
  }

  submit() {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      email2,
      username,
      token,
    } = this.state;
    if (email2 !== email) {
      Alert.alert(
        'Error',
        'Las direcciones de correo no coinciden.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
      return;
    }
    const dataToSend = {
      first_name,
      last_name,
      email,
      phone_number,
      username,
    };

    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.patch('api/users/customer/', dataToSend)
      .then((response) => {
        Alert.alert(
          'Cambio de datos exitoso',
          'Tus datos se han actualizado correctamente',
          [

            { text: 'Aceptar', onPress: () => Actions.profile({ profile: response.data, token }) },
          ],
          { cancelable: false },
        );
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          'Ha ocurrido un error al editar tus datos.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      });
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
          <Body style={{ flex: 1, paddingRight: 70 }}>
            <Title style={{ color: '#fff' }}>Editar Perfil</Title>
          </Body>
        </Header>
        <ScrollView>
          <View style={styles.container_form}>
            <View style={styles.container_input}>
              <View style={{ paddingLeft: -5, paddingTop: 10 }}>
                <Image source={require('../../../assets/icons/name.png')} resizeMode="contain" style={{ width: 40, height: 40, opacity: 0.38 }} />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Item stackedLabel style={styles.input}>
                  <Label style={{ color: 'rgba(0,0,0,0.4)', paddingLeft: 5 }}>Nombres</Label>
                  <Input
                    style={{ width: 250, height: 30 }}
                    defaultValue={this.state.first_name}
                    onChangeText={first_name => this.setState({ first_name })}
                  />
                </Item>
              </View>
            </View>
            <View style={styles.container_input}>
              <View style={{ paddingLeft: -5, paddingTop: 10 }}>
                <Image source={require('../../../assets/icons/name.png')} resizeMode="contain" style={{ width: 40, height: 40, opacity: 0.38 }} />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Item stackedLabel style={styles.input}>
                  <Label style={{ color: 'rgba(0,0,0,0.4)', paddingLeft: 5 }}>Apellidos</Label>
                  <Input
                    style={{ width: 250, height: 30 }}
                    defaultValue={this.state.last_name}
                    onChangeText={last_name => this.setState({ last_name })}
                  />
                </Item>
              </View>
            </View>
            <View style={styles.container_input}>
              <View style={{ paddingLeft: -5, paddingTop: 10 }}>
                <Image source={require('../../../assets/icons/cellphone.png')} resizeMode="contain" style={{ width: 40, height: 40, opacity: 0.38 }} />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Item stackedLabel style={styles.input}>
                  <Label style={{ color: 'rgba(0,0,0,0.4)', paddingLeft: 5 }}>Celular de contacto</Label>
                  <Input
                    style={{ width: 250, height: 30 }}
                    defaultValue={this.state.phone_number}
                    onChangeText={phone_number => this.setState({ phone_number })}
                  />
                </Item>
              </View>
            </View>
            <View style={styles.container_input}>
              <View style={{ paddingLeft: -5, paddingTop: 10 }}>
                <Image source={require('../../../assets/icons/mail.png')} resizeMode="contain" style={{ width: 40, height: 40, opacity: 0.38 }} />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Item stackedLabel style={styles.input}>
                  <Label style={{ color: 'rgba(0,0,0,0.4)', paddingLeft: 5 }}>Correo electrónico</Label>
                  <Input
                    style={{ width: 250, height: 30 }}
                    defaultValue={this.state.email}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email, username: email })}
                  />
                </Item>
              </View>
            </View>
            <View style={styles.container_input}>
              <View style={{ paddingLeft: -5, paddingTop: 10 }}>
                <Image source={require('../../../assets/icons/mail.png')} resizeMode="contain" style={{ width: 40, height: 40, opacity: 0.38 }} />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Item stackedLabel style={styles.input}>
                  <Label style={{ color: 'rgba(0,0,0,0.4)', paddingLeft: 5 }}>Repetir Correo electrónico</Label>
                  <Input
                    style={{ width: 250, height: 30 }}
                    defaultValue={this.state.email2}
                    autoCapitalize="none"
                    onChangeText={email2 => this.setState({ email2 })}
                  />
                </Item>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer style={{ backgroundColor: 'white', borderToColor: 'rgba(0,0,0,0.1)' }}>
          <View style={{ paddingLeft: 120 }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Text style={{ color: 'rgba(0,0,0,0.3)' }}>Cancelar</Text>
            </Button>
          </View>
          <Button transparent info onPress={this.submit}>
            <Text>Guardar</Text>
          </Button>
        </Footer>
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
});
