import React, { Component } from 'react';

import {
  Accordion,
  Content, Footer,
  FooterTab,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Card,
  CardItem,
  View,
  Text,
  Thumbnail,
} from 'native-base';


import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Alert,
  AsyncStorage,
} from 'react-native';

import Modal from 'react-native-root-modal';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { Actions } from 'react-native-router-flux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import deviceStorage from '../AsyncStorage/deviceStorage';
import axios from '../Axios/axios';

import CardList from './CardList';


export default class Dashboard extends Component {
    _menu = null;

    constructor(props) {
      super(props);
      this.state = {
        token: '',
        visible: false,
        scale: new Animated.Value(1),
        x: new Animated.Value(0),
      };

      this.requestPolicy = this.requestPolicy.bind(this);
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

    setMenuRef = (ref) => {
      this._menu = ref;
    };

    hideMenu = () => {
      this._menu.hide();
    };

    showMenu = () => {
      this._menu.show();
    };

    scaleModal = () => {
      this.state.x.setValue(0);
      this.state.scale.setValue(0);
      Animated.spring(this.state.scale, {
        toValue: 1,
      }).start();
      this.setState({
        visible: true,
      });
      this.slide = false;
    };

    hideModal = () => {
      if (this.slide) {
        Animated.timing(this.state.x, {
          toValue: -320,
        }).start(() => {
          this.setState({
            visible: false,
          });
        });
      } else {
        Animated.timing(this.state.scale, {
          toValue: 0,
        }).start(() => {
          this.setState({
            visible: false,
          });
        });
      }
    };

    userLogout() {
      this.props.deleteJWT();
      Alert.alert('Has cerrado sesión correctamente!');
      Actions.logIn();
    }

    requestPolicy() {
      const { token } = this.state;
      console.log(token);
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      axios.get('api/insurances/customer/policy/detail/')
        .then((response) => {
          console.log(response.data);
          const policies = response.data;
          Actions.insurance({ policies, token });
        })
        .catch((error) => {
          console.log('ERROR');
          console.log(error);
          Alert.alert(
            'Atención',
            'Aún no tienes pólizas creadas. Puedes solicitar una desde aquí',
            [
              { text: 'Aceptar', onPress: () => {} },
            ],
            { cancelable: false },
          );
        });
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
            <Animated.Modal
              visible={this.state.visible}
              style={[styles.modal, {
                transform: [
                  {
                    scale: this.state.scale,
                  },
                  {
                    translateX: this.state.x,
                  },
                ],
              }]}
            >

              <View style={styles.modalContainer}>
                <Text style={styles.title}>Llamada de emergencia</Text>
                <Text style={styles.line}>─────────────────────────</Text>

                <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                  <Image
                    source={require('../../assets/icons/ambulancia.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                  <Text style={{ paddingLeft: 30 }}>Ambulancia</Text>
                  <View style={{ paddingLeft: wp('17%') }}>
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                </View>


                <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                  <Image
                    source={require('../../assets/icons/camion-de-bomberos.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                  <Text style={{ paddingLeft: 30 }}>Bomberos</Text>
                  <View style={{ paddingLeft: wp('21%') }}>
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                </View>


                <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                  <Image
                    source={require('../../assets/icons/divisa.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                  <Text style={{ paddingLeft: 30 }}>Policia</Text>
                  <View style={{ paddingLeft: wp('28%') }}>
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                </View>


                <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                  <Image
                    source={require('../../assets/icons/seguridad.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                  <Text style={{ paddingLeft: 30 }}>Seguros mundial</Text>
                  <View style={{ paddingLeft: wp('8%') }}>
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                </View>


                <View style={{ flexDirection: 'row', width: wp('70%'), paddingTop: 10 }}>
                  <Image
                    source={require('../../assets/icons/auriculares.png')}
                    resizeMode="contain"
                    style={{
                      width: 30, height: 30, opacity: 0.38, paddingLeft: 40,
                    }}
                  />
                  <Text style={{ paddingLeft: 30 }}>Asesor quality</Text>
                  <View style={{ paddingLeft: wp('13%') }}>
                    <Image
                      source={require('../../assets/icons/llamada.png')}
                      resizeMode="contain"
                      style={{ width: 30, height: 30 }}
                    />
                  </View>
                </View>

                <Button onPress={this.hideModal} transparent style={styles.button}><Text style={{ color: 'black' }}>CANCELAR</Text></Button>
              </View>
            </Animated.Modal>
          </View>

          <Header style={styles.container}>
            <Body style={{ position: 'absolute', left: wp('30%') }}>
              <Image
                source={require('../../assets/images/Quality-text1.png')}
                resizeMode="contain"
                style={{ width: 150, height: 30 }}
              />
            </Body>
            <Right>
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
          <Content>
            <CardList />
          </Content>
          <Footer style={styles.color_footer}>
            <FooterTab style={styles.color_footer}>
              <Button onPress={this.scaleModal}>
                <Image
                  source={require('../../assets/icons/call.png')}
                  style={{
                    height: 30, width: 30, flex: 1, opacity: 0.38,
                  }}
                />
                <Text style={styles.footerText}>Llamadas</Text>
              </Button>
              <Button onPress={this.requestPolicy}>
                <Image
                  source={require('../../assets/icons/compra.png')}
                  style={{
                    height: 30, width: 30, flex: 1, opacity: 0.38,
                  }}
                />
                <Text style={styles.footerText}>Mis seguros</Text>
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
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05071e',
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
    width: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    position: 'absolute',
    top: hp('43%'),
    left: wp('51%'),
  },
  title: {
    position: 'absolute',
    top: hp('3%'),
    left: wp('7%'),
    fontSize: 20,
  },
  line: {
    color: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    top: hp('8%'),
  },
  container: {
    backgroundColor: '#05071e',
    paddingTop: 5,
    paddingBottom: 20,
  },
  color_footer: {
    backgroundColor: '#e9ebe2',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  footerText: {
    fontSize: 10,
  },

});
