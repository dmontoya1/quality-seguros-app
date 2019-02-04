import React, { Component } from 'react';

import {
  Container, Header, Content, List, Text, Left, Body, Right, Button, Icon, Footer, FooterTab, View,
} from 'native-base';


import {
  Image,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Modal from 'react-native-modal';

import Menu, { MenuItem } from 'react-native-material-menu';

import { Actions } from 'react-native-router-flux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import InsurancesList from './Insurance/InsurancesList';
import deviceStorage from '../AsyncStorage/deviceStorage';
import axios from '../Axios/axios';

export default class Insurance extends Component {
  _menu = null;

  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      visible: false,
      isModalVisible: false,
    };
    this.userRequests = this.userRequests.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.userLogout = this.userLogout.bind(this);

    AsyncStorage.getItem('id_token', (err, result) => {
      this.setState({
        token: result,
      });
    });
  }


  getProfile() {
    const { token } = this.state;
    this.hideMenu();
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.get('api/users/customer/')
      .then((response) => {
        const profile = (response.data);
        Actions.profile({ profile, token });
      })
      .catch((error) => {
        console.log('ERROR');
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
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  hideMenu = () => {
    this._menu.hide();
  };

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  showMenu = () => {
    this._menu.show();
  };

  userLogout() {
    this.props.deleteJWT();
    Alert.alert('Has cerrado sesión correctamente!');
    Actions.logIn();
  }

  userRequests() {
    const { token } = this.state;
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.get('api/insurances/requests/')
      .then((response) => {
        const requests = response.data;
        if (requests.length > 0) {
          Actions.userRequest({ requests, token });
        } else {
          Alert.alert(
            'Atención',
            'Aún no tienes solicitudes creadas. Puedes solicitar un seguro desde aqui',
            [
              { text: 'Aceptar', onPress: () => {} },
            ],
            { cancelable: false },
          );
        }
      })
      .catch((error) => {
        console.log('ERROR');
        console.log(error);
        Alert.alert(
          'Atención',
          'Aún no tienes solicitudes creadas. Puedes solicitar un seguro desde aqui',
          [
            { text: 'Aceptar', onPress: () => {} },
          ],
          { cancelable: false },
        );
      });
  }

  render() {
    const { token } = this.props;
    return (

      <Container>
        <View style={styles.container}>
          <Modal isVisible={this.state.isModalVisible} animationIn="slideInLeft" animationOut="slideOutRight">
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Llamada de emergencia</Text>
              <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('125');
                }}
                >
                  <Image
                    source={require('../../assets/icons/ambulancia.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('125');
                }}
                >
                  <Text style={{ paddingLeft: 30 }}>Ambulancia</Text>
                </TouchableOpacity>
                <View style={{ paddingLeft: wp('18%') }}>
                  <TouchableOpacity onPress={() => {
                    RNImmediatePhoneCall.immediatePhoneCall('125');
                  }}
                  >
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('119');
                }}
                >
                  <Image
                    source={require('../../assets/icons/camion-de-bomberos.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('119');
                }}
                >
                  <Text style={{ paddingLeft: 30 }}>Bomberos</Text>
                </TouchableOpacity>
                <View style={{ paddingLeft: wp('21%') }}>
                  <TouchableOpacity onPress={() => {
                    RNImmediatePhoneCall.immediatePhoneCall('119');
                  }}
                  >
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('156');
                }}
                >
                  <Image
                    source={require('../../assets/icons/divisa.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('156');
                }}
                >
                  <Text style={{ paddingLeft: 30 }}>Policia</Text>
                </TouchableOpacity>
                <View style={{ paddingLeft: wp('28%') }}>
                  <TouchableOpacity onPress={() => {
                    RNImmediatePhoneCall.immediatePhoneCall('156');
                  }}
                  >
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('123');
                }}
                >
                  <Image
                    source={require('../../assets/icons/seguridad.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  RNImmediatePhoneCall.immediatePhoneCall('123');
                }}
                >
                  <Text style={{ paddingLeft: 30 }}>Emergencias</Text>
                </TouchableOpacity>
                <View style={{ paddingLeft: wp('17%') }}>
                  <TouchableOpacity onPress={() => {
                    RNImmediatePhoneCall.immediatePhoneCall('123');
                  }}
                  >
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Button onPress={this._toggleModal} transparent style={styles.button}><Text style={{ color: 'black' }}>CANCELAR</Text></Button>
            </View>
          </Modal>
        </View>
        <Header style={styles.container}>
          <Left style={{ flex: 1 }}>
            <TouchableOpacity onPress={this._toggleModal} style={{ paddingLeft: 10 }}>
              <Image
                source={require('../../assets/icons/call.png')}
                style={{
                  height: 25, width: 25,
                }}
              />

            </TouchableOpacity>
          </Left>
          <Body style={{ flex: 1, right: wp('6%') }}>
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
)
                  }
            >
              <MenuItem onPress={this.getProfile}>Perfil</MenuItem>
              <MenuItem onPress={this.userLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </Right>
        </Header>
        <Content>
          <List>
            <InsurancesList token={token} />
          </List>
        </Content>
        <Footer style={styles.color_footer}>
          <FooterTab style={styles.color_footer}>
            <Button style={styles.active}>
              <Image
                source={require('../../assets/icons/compra.png')}
                style={{
                  height: 30, width: 30, flex: 1, opacity: 0.38,
                }}
              />
              <Text style={styles.footerTextActive}>Mis seguros</Text>
            </Button>
            <Button onPress={() => Actions.home()}>
              <Image
                source={require('../../assets/icons/seguro.png')}
                style={{
                  height: 30, width: 30, flex: 1, opacity: 0.38,
                }}
              />
              <Text style={styles.footerText}>Nuevas coberturas</Text>
            </Button>
            <Button onPress={this.userRequests}>
              <Image
                source={require('../../assets/icons/historial.png')}
                style={{
                  height: 30, width: 30, flex: 1, opacity: 0.38,
                }}
              />
              <Text style={styles.footerText}>Mis solicitudes</Text>
            </Button>

          </FooterTab>
        </Footer>
      </Container>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05071e',
    paddingTop: 5,
    paddingBottom: 15,
  },
  color_footer: {
    backgroundColor: '#e9ebe2',
  },
  line: {
    color: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: hp('8%'),
  },
  imageContainer: {
    flex: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: wp('80%'),
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.3)',
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },

  dotActivateStyle: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  footerText: {
    fontSize: 8,
  },
  active: {
    backgroundColor: '#ccc',
  },
  footerTextActive: {
    color: '#05071e',
    fontSize: 8,
    fontWeight: 'bold',
  },
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    height: hp('50%'),
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: hp('3%'),
    left: wp('7%'),
    fontSize: 20,
  },
  button: {
    position: 'absolute',
    top: hp('43%'),
    left: wp('51%'),
  },

});
