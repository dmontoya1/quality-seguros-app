import React, { Component } from 'react';
import {
  Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item, Label, View,
} from 'native-base';
import { Image, StyleSheet, Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';

import axios from '../../Axios/axios';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
    };
    this.editProfile = this.editProfile.bind(this);
    this.userInsurances = this.userInsurances.bind(this);
  }

  editProfile() {
    const { token, profile } = this.props;
    Actions.profile_edit({ profile, token });
  }

  userInsurances() {
    const { token } = this.state;
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.get('api/insurances/customer/policy/detail/')
      .then((response) => {
        const policies = response.data;
        Actions.insurance({ policies, token });
      })
      .catch((error) => {
        Alert.alert(
          'Atención',
          'Aún no tienes pólizas creadas.',
          [
            { text: 'Aceptar', onPress: () => Actions.home() },
          ],
          { cancelable: false },
        );
      });
  }

  render() {
    const { token, profile } = this.props;
    console.log(token);
    return (
      <Container>
        <Header style={styles.container}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.userInsurances}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 1, paddingRight: 20 }}>
            <Title style={{ color: '#fff' }}>Perfil</Title>
          </Body>
        </Header>
        <View style={styles.container_form}>
          <View style={styles.container_input}>
            <View style={{ paddingLeft: -5, paddingTop: 10 }}>
              <Image source={require('../../../assets/icons/name.png')} resizeMode="contain" style={{ width: 40, height: 40, opacity: 0.38 }} />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Item stackedLabel style={styles.input}>
                <Label style={{ color: 'rgba(0,0,0,0.4)', paddingLeft: 5 }}>Nombre</Label>
                <Input disabled style={{ width: 250 }} defaultValue={profile.first_name} />
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
                <Input disabled style={{ width: 250 }} defaultValue={profile.last_name} />
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
                <Input disabled style={{ width: 250 }} defaultValue={profile.phone_number} />
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
                <Input disabled style={{ width: 250 }} defaultValue={profile.email} />
              </Item>
            </View>
          </View>
        </View>
        <View style={{ paddingLeft: 250, paddingTop: 30 }}>
          <Button
            transparent
            style={{ width: 65, height: 65 }}
            onPress={() => Actions.profile_edit({ profile_data: profile, token })}
          >
            <Image
              source={require('../../../assets/icons/edit.png')}
              resizeMode="contain"
              style={{ width: 60, height: 60 }}
            />
          </Button>
        </View>
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
