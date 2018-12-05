import React, { Component } from 'react';

import {
  Container, Header, Content, List, Text, Left, Body, Right, Button, Icon, Footer, FooterTab,
} from 'native-base';


import {
  Image,
  StyleSheet,
  Alert,
  AsyncStorage,
} from 'react-native';


import Menu, { MenuItem } from 'react-native-material-menu';

import { Actions } from 'react-native-router-flux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InsurancesList from './Insurance/InsurancesList';
import deviceStorage from '../AsyncStorage/deviceStorage';
import axios from '../Axios/axios';

export default class Insurance extends Component {
  _menu = null;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
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

  requestPolicy() {
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

      <Container style={{ paddingTop: 20 }}>
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
            <Button onPress={this.requestPolicy} style={styles.active}>
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
                source={require('../../assets/icons/seguridad.png')}
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
    fontSize: 10,
  },
  active: {
    backgroundColor: '#ccc',
  },
  footerTextActive: {
    color: '#05071e',
    fontSize: 10,
    fontWeight: 'bold',
  },

});
