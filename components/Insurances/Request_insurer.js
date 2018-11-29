import React, { Component } from 'react';
import {
  Container, Header, Left, Body, Right, Button,
  Icon, Card, CardItem, View, Text, Input,
} from 'native-base';
import {
  Image, StyleSheet, Alert, ActivityIndicator, Picker, ScrollView,
} from 'react-native';

import { Provider } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Actions } from 'react-native-router-flux';

import Menu, { MenuItem } from 'react-native-material-menu';

import ImagePicker from 'react-native-image-picker';

import FormData from 'form-data';
import { CheckBox } from 'react-native-elements';
import axios from '../Axios/axios';
import VehicleClass from './SoatOptions/VehicleClass';
import VehicleOptions from './SoatOptions/VehicleOptions';


const data = {
  vehicleClases: [
    { id: 'motos', name: 'Motos' },
    { id: 'camp-camioneta0-9', name: 'Camperos y Camionetas 0-9 Años' },
    { id: 'camp-camioneta10', name: 'Camperos y Camionetas 10 Años o más' },
    { id: 'carga-mixto', name: 'Carga o Mixto' },
    { id: 'ofi-especiales', name: 'Oficiales Especiales' },
    { id: 'fam-09', name: 'Autos Familiares 0-9 Años' },
    { id: 'fam-10', name: 'Autos Familiares 10 Años o más' },
    { id: 'vehicle6-9', name: 'Vehiculo 6 o más pasajeros 0-9 Años' },
    { id: 'vehicle6-10', name: 'Vehiculo 6 o más pasajeros 10 Años 0 más' },
    { id: 'negocio-09', name: 'Autos negocio 0-9 Años' },
    { id: 'negocio-10', name: 'Autos negocio 10 Años o más' },
    { id: 'bus-urbano', name: 'Bus, Buseta Serv. Púbico Urbano' },
    { id: 'bus-inter', name: 'Serv. Público Intermunicipal' },

  ],
  vehicleOptions: [
    {
      id: 100, name: 'Ciclomotores', classId: 'motos', price: '$163.150',
    },
    {
      id: 111, name: 'Menos de 100 C.C.', classId: 'motos', price: '$337.750',
    },
    {
      id: 121, name: 'de 100 a 200 C.C.', classId: 'motos', price: '$452.950',
    },
    {
      id: 131, name: 'Mas de 200 C.C.', classId: 'motos', price: '$510.850',
    },
    {
      id: 141, name: 'Motocarro, Tricimoto, Cuadriciclos', classId: 'motos', price: '$510.850',
    },
    {
      id: 211, name: 'Menos de 1500 C.C.', classId: 'camp-camioneta0-9', price: '531.850',
    },
    {
      id: 221, name: 'De 1500 a 2500 C.C.', classId: 'camp-camioneta0-9', price: '635.050',
    },
    {
      id: 231, name: 'Mas de 2500 C.C.', classId: 'camp-camioneta0-9', price: '$744.850',
    },
    {
      id: 212, name: 'Menos de 1500 C.C.', classId: 'camp-camioneta10', price: '$639.250',
    },
    {
      id: 222, name: 'De 1500 a 2500 C.C.', classId: 'camp-camioneta10', price: '$752.200',
    },
    {
      id: 232, name: 'Mas de 2500 C.C.', classId: 'camp-camioneta10', price: '$854.500',
    },
    {
      id: 311, name: 'Menos de 5 Toneladas', classId: 'carga-mixto', price: '$595.900',
    },
    {
      id: 321, name: 'Entre 5 y 15 Toneladas', classId: 'carga-mixto', price: '$860.350',
    },
    {
      id: 331, name: 'Mas de 15 Toneladas', classId: 'carga-mixto', price: '$1.087.750',
    },
    {
      id: 411, name: 'Menos de 1500 C.C.', classId: 'ofi-especiales', price: '$670.600',
    },
    {
      id: 421, name: 'De 1500 a 2500 C.C.', classId: 'ofi-especiales', price: '$845.200',
    },
    {
      id: 431, name: 'Mas de 2500 C.C.', classId: 'ofi-especiales', price: '$1.013.200',
    },
    {
      id: 511, name: 'Menos de 1500 C.C.', classId: 'fam-09', price: '$300.250',
    },
    {
      id: 521, name: 'De 1500 a 2500 C.C.', classId: 'fam-09', price: '$365.500',
    },
    {
      id: 531, name: 'Mas de 2500 C.C.', classId: 'fam-09', price: '$426.850',
    },
    {
      id: 512, name: 'Menos de 1500 C.C.', classId: 'fam-10', price: '$397.900',
    },
    {
      id: 522, name: 'De 1500 a 2500 C.C.', classId: 'fam-10', price: '$454.600',
    },
    {
      id: 532, name: 'Mas de 2500 C.C.', classId: 'fam-10', price: '$506.050',
    },
    {
      id: 611, name: 'Menos de 2500 C.C.', classId: 'vehicle6-9', price: '$535.000',
    },
    {
      id: 621, name: '2500 C.C. o mas', classId: 'vehicle6-9', price: '$715.900',
    },
    {
      id: 611, name: 'Menos de 2500 C.C.', classId: 'vehicle6-10', price: '$535.000',
    },
    {
      id: 621, name: '2500 C.C. o mas', classId: 'vehicle6-10', price: '$715.900',
    },
    {
      id: 711, name: 'Menos de 1500 C.C.', classId: 'negocio-09', price: '$371.800',
    },
    {
      id: 721, name: 'De 1500 a 2500 C.C.', classId: 'negocio-09', price: '$461.950',
    },
    {
      id: 731, name: 'Mas de 2500 C.C.', classId: 'negocio-09', price: '$595.900',
    },
    {
      id: 712, name: 'Menos de 1500 C.C.', classId: 'negocio-10', price: '$464.350',
    },
    {
      id: 722, name: 'De 1500 a 2500 C.C.', classId: 'negocio-10', price: '$571.000',
    },
    {
      id: 732, name: 'Mas de 2500 C.C.', classId: 'negocio-10', price: '$699.100',
    },
    {
      id: 811, name: 'Bus, Buseta Urbano', classId: 'bus-urbano', price: '$889.300',
    },
    {
      id: 911, name: 'Menos de 10 pasajeros', classId: 'bus-inter', price: '$879.550',
    },
    {
      id: 921, name: '10 o mas pasajeros', classId: 'bus-inter', price: '$1.276.000',
    },
  ],
  vehicleEmpty: [
    { id: 1, name: 'Seleccione primero una clase' },
  ],
};


export default class Request extends Component {
  _menu = null;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      property1: null,
      property2: null,
      oldSoat: null,
      button_property1: false,
      button_property2: false,
      button_oldSoat: false,
      adviser_code: '',
      loader: false,
      fisico: false,
      vehicleClases: data.vehicleClases,
      classId: null,
      vehicleOptions: data.vehicleEmpty,
      optionId: null,
    };
    this.submit = this.submit.bind(this);
    this.propertyPhoto = this.propertyPhoto.bind(this);
    this.propertyPhoto1 = this.propertyPhoto1.bind(this);
    this.oldSOATPhoto = this.oldSOATPhoto.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }


  getProfile() {
    const { token } = this.state;
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    axios.get('api/users/customer/')
      .then((response) => {
        console.log('THEN');
        console.log(response);
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

  propertyPhoto = () => {
    const options = {
      title: 'Tomar una foto',
      takePhotoButtonTitle: 'Tomar una foto',
      chooseFromLibraryButtonTitle: 'Seleccionar una foto',
      cancelButtonTitle: 'CANCELAR',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        Alert.alert(
          'Atención',
          'Usuario cancelo la captura de foto.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (response.error) {
        Alert.alert(
          'Error',
          'Error al cargar la foto.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          property1: source,
          button_property1: true,
        });
      }
    });
  }

  propertyPhoto1 = () => {
    const options = {
      title: 'Tomar una foto',
      takePhotoButtonTitle: 'Tomar una foto',
      chooseFromLibraryButtonTitle: 'Seleccionar una foto',
      cancelButtonTitle: 'CANCELAR',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        Alert.alert(
          'Atención',
          'Usuario cancelo la captura de foto.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (response.error) {
        Alert.alert(
          'Error',
          'Error al cargar la foto.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          property2: source,
          button_property2: true,
        });
      }
    });
  }

  oldSOATPhoto = () => {
    const options = {
      title: 'Tomar una foto',
      takePhotoButtonTitle: 'Tomar una foto',
      chooseFromLibraryButtonTitle: 'Seleccionar una foto',
      cancelButtonTitle: 'CANCELAR',
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        Alert.alert(
          'Atención',
          'Usuario cancelo la captura de foto.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (response.error) {
        Alert.alert(
          'Error',
          'Error al cargar la foto.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          oldSoat: source,
          button_oldSoat: true,
        });
      }
    });
  }

  onSelectClass = (vClass) => {
    const selCities = data.vehicleOptions.filter(c => c.classId === vClass);
    this.setState({
      classId: vClass,
      vehicleOptions: selCities,
    });
  };

  onSelectOption = (option) => {
    if (option) {
      this.setState({
        optionId: option,
      });
      const OptionId = data.vehicleOptions.filter(c => c.id === option);
      const { price } = OptionId[0];
      Alert.alert(
        'Información',
        `El precio de tu SOAT es: ${price}`,
        [
          { text: 'Aceptar', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
  };


  userLogout() {
    this.props.deleteJWT();
    Alert.alert('Has cerrado sesión correctamente!');
    Actions.logIn();
  }

  submit() {
    const { token, policy } = this.props;
    const name = policy.name;
    const {
      adviser_code, property1, property2, oldSoat, classId, optionId, fisico,
    } = this.state;
    this.setState({
      loader: true,
    });
    const option = data.vehicleOptions.filter(c => c.id === optionId);
    console.log(property1);
    console.log(property2);

    if (property1 != null && property2 != null && classId != null && optionId != null) {
      axios.defaults.headers.common.Authorization = `JWT ${token}`;

      const body = new FormData();
      body.append('name', name);
      body.append('fisico', fisico);
      body.append('optionId', optionId);
      body.append('price', option[0].price);
      body.append('adviser_code', adviser_code);
      body.append('property1', {
        uri: property1.uri,
        type: 'image/jpeg', // or document.type
        name: 'property1',
      });
      body.append('property2', {
        uri: property2.uri,
        type: 'image/jpeg', // or photo.type
        name: 'property2',
      });
      if (oldSoat != null) {
        body.append('oldSoat', {
          uri: oldSoat.uri,
          type: 'image/jpeg', // or photo.type
          name: 'oldSoat',
        });
      }
      axios.post('api/insurances/insurance/request/', body)
        .then((response) => {
          console.log('THEN');
          console.log(response);
          this.setState({
            loader: false,
          });
          Alert.alert(
            'Información',
            'Solicitud realizada con exito.',
            [
              { text: 'Aceptar', onPress: () => Actions.home({ token }) },
            ],
            { cancelable: false },
          );
        })
        .catch((error) => {
          console.log('ERROR');
          console.log(error);
          this.setState({
            loader: false,
          });
          Alert.alert(
            'Información',
            'Ha ocurrido un error. Intenta nuevamente',
            [
              { text: 'Aceptar', onPress: () => {} },
            ],
            { cancelable: false },
          );
        });
    } else {
      this.setState({
        loader: false,
      });
      Alert.alert(
        'Error',
        'Debes adjuntar las imagenes de la tarjeta de propiedad, al igual que seleccionar clase de tu vehiculo',
        [
          { text: 'Aceptar', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    const { token, policy } = this.props;
    const property1 = require('../../assets/icons/camara.png');
    const property2 = require('../../assets/icons/check.png');
    const oldSoat = require('../../assets/icons/camara.png');
    const oldSoat2 = require('../../assets/icons/check.png');
    const {
      button_property1, button_property2, button_oldSoat,
    } = this.state;
    let urlDocument;
    let urlproperty2;

    if (!button_property1) {
      urlDocument = property1;
    } else if (button_property1) {
      urlDocument = property2;
    }

    if (!button_property2) {
      urlproperty2 = property1;
    } else if (button_property2) {
      urlproperty2 = property2;
    }
    let urloldSoat;
    if (!button_oldSoat) {
      urloldSoat = oldSoat;
    } else if (button_oldSoat) {
      urloldSoat = oldSoat2;
    }

    if (this.state.loader) {
      return (
        <Container style={{ paddingTop: 20 }}>
          <Header style={styles.container}>
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ position: 'absolute', left: wp('30%') }}>
              <Image
                source={require('../../assets/images/logo.png')}
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

          <View style={[styles.loader]}>

            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Container>

      );
    }
    const { Item } = Picker;
    return (
      <Container style={{ paddingTop: 20 }}>
        <Header style={styles.container}>
          <Left>

            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ position: 'absolute', left: wp('30%') }}>
            <Image
              source={require('../../assets/images/logo.png')}
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
        <ScrollView>

          <View style={{ paddingTop: 10, paddingLeft: 5 }}>
            <Card style={{ width: wp('96%') }}>
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
                        Ahora podrás llevar tu SOAT en tu celular y presentarlo cuando lo requieras.
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
                                En caso de requerir asistencua puedes comunicarte con nosotros.
                      </Text>
                    </View>
                  </View>
                </View>
              </CardItem>
            </Card>
            <Card style={{ width: wp('96%') }}>
              <CardItem style={{ width: wp('90%'), position: 'relative', left: 10 }}>
                <View style={{ paddingTop: 20, flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Text style={{
                        color: 'rgba(0,0,0,1)', fontSize: 13, position: 'relative', top: -5, right: 10,
                      }}
                      >
                          Foto Tarjeta de Propiedad parte delantera
                      </Text>
                    </View>
                    <View style={{ position: 'relative', top: -15, textAlign: 'right' }}>
                      <Button transparent onPress={this.propertyPhoto}>
                        <Image
                          source={urlDocument}
                          style={{ width: 40, height: 40 }}
                        />
                      </Button>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Text style={{
                        color: 'rgba(0,0,0,1)', fontSize: 13, position: 'relative', top: -5, right: 10,
                      }}
                      >
                            Foto Tarjeta de Propiedad parte trasera
                      </Text>
                    </View>
                    <View style={{ position: 'relative', top: -15, textAlign: 'right' }}>
                      <Button transparent onPress={this.propertyPhoto1}>
                        <Image
                          source={urlproperty2}
                          style={{ width: 40, height: 40 }}
                        />
                      </Button>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <View>
                      <Text style={{
                        color: 'rgba(0,0,0,1)', fontSize: 13, position: 'relative', top: -5, right: 10,
                      }}
                      >
                        Foto SOAT Anterior (Opcional)
                      </Text>
                    </View>
                    <View style={{ position: 'relative', top: -15, textAlign: 'right' }}>
                      <Button transparent onPress={this.oldSOATPhoto}>
                        <Image
                          source={urloldSoat}
                          style={{ width: 40, height: 40 }}
                        />
                      </Button>
                    </View>
                  </View>
                </View>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <View style={{ paddingTop: 20, flex: 1 }}>
                  <VehicleClass
                    data={this.state.vehicleClases}
                    selectedId={this.state.classId}
                    onSelect={this.onSelectClass}
                  />
                  <VehicleOptions
                    data={this.state.vehicleOptions}
                    selectedId={this.state.optionId}
                    onSelect={this.onSelectOption}
                  />
                  <Text style={{ marginTop: 15, marginBottom: 15 }}>
                    ¿Quieres que te enviemos tu seguro de manera fisico?
                  </Text>
                  <CheckBox
                    title="Si, envíamelo"
                    checked={this.state.fisico}
                    onPress={() => this.setState({ fisico: !this.state.fisico })}
                  />
                </View>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Input
                  placeholder="Codigo Asesor"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={adviser_code => this.setState({ adviser_code })}
                />
              </CardItem>
            </Card>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 30 }}>


              <Button
                block
                danger
                style={styles.button}
                onPress={() => this.submit(this.state.property1, this.state.property2)}
              >
                <Text style={{ color: 'white' }}>SOLICITAR</Text>
              </Button>
            </View>

          </View>
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
    marginBottom: 20,
  },
  loader: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
