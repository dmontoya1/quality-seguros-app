import React, { Component } from 'react';
import {
  Image, Alert, StyleSheet,ScrollView
} from 'react-native';
import {
  Container, Header, Left, Body, Right, Button,
  Icon, Card, CardItem, View, Text, Input,
} from 'native-base';

import { Provider } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Actions } from 'react-native-router-flux';

import Menu, { MenuItem } from 'react-native-material-menu';

import axios from '../Axios/axios';

import InsuranceFormETD from './Forms/InsuranceFormETD';
import Store from '../../Store/Store';

class RequestInsurance extends Component {
  _menu = null;
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      values_fields:[],
    };
    this.postDynamicInsurance = this.postDynamicInsurance.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  getProfile() {
    const { token } = this.props;
    this.hideMenu();
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.get('api/users/customer/')
      .then((response) => {
        const profile = (response.data);
        Actions.profile({ profile, token });
      })
      .catch((error) => {
        Alert.alert(
          'Atención',
          'Ha ocurrido un error al ingresar a tu perfil',
          [
            { text: 'Aceptar', onPress: () => {} },
          ],
          { cancelable: false },
        );
        console.log(error);
      });
    console.warn(token);
  }

  postDynamicInsurance() {
    var dataToSend =[];
    var id_insurance = this.props.navigation.state.params.policy.id;
    var data = {insurance:id_insurance};
    dataToSend.push(data);

    Object.keys(this.state.values_fields).map(key => {
      let item = this.state.values_fields[key];
      data = {question:key,value:item}
      dataToSend.push(data);
    })

    console.warn(dataToSend);
    axios.post('api/insurances/request-create/', dataToSend)
      .then((response) => {
        console.warn(response);
      })
      .catch((error) => {
        console.log(error.response);
        Alert.alert(
          'Error',
          'El método usado no es el correcto',
          [
            { text: 'Aceptar', onPress: () => {} },
          ],
          { cancelable: false },
        );
        console.log(error);
      });
  }

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  async formSubmit(values_fields,list_required){
    if(Object.keys(values_fields).length === 0 ){
      Alert.alert('No has diligenciado ningún campo.');
    } else {
      await this.setState({ values_fields });
      if (list_required){
        for (x=0;x<list_required.length;x++){
          var id = list_required[x];
          if(!this.state.values_fields[id]){
            Alert.alert('Te falta ingresar campos obligatorios');
            return false;
          }
        }
      }
      console.warn(values_fields);
      this.postDynamicInsurance();
      //Informar sobre seguro dinamico creado.
    }
  }

  userLogout() {
    Alert.alert(
      'Has cerrado sesión correctamente',
      '',
      [
        {text: 'Ok', onPress: async () => {
          this.hideMenu();
          this.props.deleteJWT();
          Actions.logIn();
        }},
      ],
      {cancelable: false},
    )
  }

  render() {
    const { token, policy } = this.props;
    return (
      <Container>
        <Header style={styles.container}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" style={{ color: '#fff' }} />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Image
              source={require('../../assets/images/Quality-text1.png')}
              resizeMode="contain"
              style={{ width: 150, height: 30 }}
            />
          </Body>
          <Right style={{ flex: 1 }}>
            <Menu
              ref={this.setMenuRef}
              button={(
                <Button
                  transparent
                  onPress={this.showMenu}
                  style={{ width: 70, height: 70 }}
                >
                  <Image
                    source={require('../../assets/icons/cuenta.png')}
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                  />
                </Button>
                )}
            >
              <MenuItem onPress={this.getProfile}>Perfil</MenuItem>
              <MenuItem onPress={this.userLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </Right>
        </Header>
        <ScrollView style={styles.view}>
          <Card>
            <CardItem>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', width: wp('75%') }}>
                  <View style={{ position: 'relative', top: -5, right: 10 }}>
                    <Image
                      source={require('../../assets/icons/Scellphone.png')}
                      resizeMode="contain"
                      style={{ width: 40, height: 40, opacity: 0.38 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13, paddingLeft: 10 }}>
                      Ahora podrás llevar tu seguro
                      {' '}
                      {policy.name}
                      {' '}
                      en tu celular y presentarlo cuando lo requieras.
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: wp('75%'), paddingTop: 20 }}>
                  <View style={{ position: 'relative', top: -5, right: 5 }}>
                    <Image
                      source={require('../../assets/icons/call.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, opacity: 0.38 }}
                    />
                  </View>
                  <View>
                    <Text style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13, paddingLeft: 20 }}>
                        En caso de requerir asistencia puedes comunicarte con nosotros.
                    </Text>
                  </View>
                </View>
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Provider store={Store}>
                <View>
                  <InsuranceFormETD
                    policy={policy}
                    formSubmit={(value,list) => {this.formSubmit(value,list)}}/>
                </View>
              </Provider>
            </CardItem>
          </Card>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05071e',
    paddingTop: 20,
  },
  button: {
    borderRadius: 10,
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
});


export default RequestInsurance;
