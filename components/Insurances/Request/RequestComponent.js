import React, { Component } from 'react';


import {
  Left,
  Body,
  Icon,
  Container,
  Header,
  Text,
  Thumbnail,
  ListItem, Right,
} from 'native-base';

import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';

import Menu, { MenuItem } from 'react-native-material-menu';

import ImagePicker from 'react-native-image-picker';

import { Actions } from 'react-native-router-flux';

import axios from '../../Axios/axios';

class RequestComponent extends Component {
  constructor() {
    super();
    this.state = {
      payment: false,
      loader: false,
    };
    this.onPress = this.onPress.bind(this);
    this.payment = this.payment.bind(this);
  }


  onPress = () => {
    const { request_code, price } = this.props;
    Alert.alert(
      'Datos para el pago',
      `Para realizar el pago, dirigete a "Bancolombia", y realizar una consignacion por valor de ${price} en la cuenta de ahorros No "11535824471", y con referencia de pago ${request_code}. Luego, adjunta tu comprobante de pago aqui`,
      [
        { text: 'Aceptar', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }

  payment = () => {
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
            { text: 'OK', onPress: () => console.log(response.error) },
          ],
          { cancelable: false },
        );
      } else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const { requests, token, request_code } = this.props;
        this.setState({
          payment: source.uri,
          loader: true,
        });

        const body = new FormData();
        body.append('request_code', request_code);
        body.append('payment', {
          uri: source.uri,
          type: 'image/jpeg', // or document.type
          name: 'payment',
        });

        axios.post('api/insurances/upload-payment/', body)
          .then((response) => {
            this.setState({
              loader: false,
            });
            Alert.alert(
              'Recibo enviado exitosamente',
              'Tu recibo se ha adjuntado exitosamente. En cuanto tu SOAT este listo, te enviaremos una notificacion',
              [
                { text: 'Aceptar', onPress: () => Actions.home({ token }) },
              ],
              { cancelable: false },
            );
          })
          .catch((error) => {
            Alert.alert(
              'Error',
              'Ha ocurrido un error al enviar el recibo de pago',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
            console.log(error);
          });
      }
    });
  }

  render() {
    const loading = (
      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <Text style={styles.loaderText}>
            Estamos cargando tu comprobante.
            {'\n'}
            Espera un momento por favor...
          </Text>
          <ActivityIndicator size="large" color="#999" />
        </View>
      </View>
    );
    const {
      id, insurance_name, status, adviser_code, request_code, request_date, price,
    } = this.props;

    let price1 = '$0';
    let adviser_code1 = 'Sin código';
    if (price) {
      price1 = price;
    }
    if (adviser_code) {
      adviser_code1 = adviser_code;
    }

    if (this.state.loader) {
      return loading;
    }

    if (status === 'Pendiente') {
      return (
        <ListItem>
          <Body>
            <Text>{insurance_name}</Text>
            <Text note>
              Codigo de la solicitud:
              {' '}
              {request_code}
            </Text>
            <Text note>
              Fecha de la solicitud:
              {' '}
              {request_date}
            </Text>
            <Text note>
              Estado:
              {' '}
              {status}
            </Text>
            <Text note>
              Precio:
              {' '}
              {price1}
            </Text>
            <Text note>
              Codigo asesor:
              {' '}
              {adviser_code1}
            </Text>
            <View style={styles.container1}>
              <View>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => this.payment({ request_code })}
                >
                  <Text style={styles.buttonText}>Subir comprobante</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onPress({ request_code })}
                >
                  <Text style={styles.buttonText}>Transferencia bancaria</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Actions.requestPickup({ id })}
                >
                  <Text style={styles.buttonText}>Pago en efectivo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Body>
        </ListItem>
      );
    }
    return (
      <ListItem>
        <Body>
          <Text>{insurance_name}</Text>
          <Text note>
            Codigo de la solicitud:
            {' '}
            {request_code}
          </Text>
          <Text note>
              Fecha de la solicitud:
            {' '}
            {request_date}
          </Text>
          <Text note>
            Estado:
            {' '}
            {status}
          </Text>
          <Text note>
              Precio:
            {' '}
            {price1}
          </Text>
          <Text note>
            Codigo asesor:
            {' '}
            {adviser_code1}
          </Text>

        </Body>
      </ListItem>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  container1: {
    flex: 1,
    marginTop: 15,
    textAlign: 'center',
    paddingVertical: 5,
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#999',
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
  button2: {
    backgroundColor: '#05071e',
    paddingVertical: 8,
    borderRadius: 10,
  },
  loaderContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loader: {
    backgroundColor: '#fff',
    height: 250,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    color: '#05071e',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 20,
  },
});

export default RequestComponent;
