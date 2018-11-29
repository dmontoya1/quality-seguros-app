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
      `Para realizar el pago, dirigete al Banco de Occidente, y realizar una consignacion por valor de ${price} en la cuenta de ahorros No 0598883333, y con referencia de pago ${request_code}. Luego, adjunta tu comprobante de pago aqui`,
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
            { text: 'OK', onPress: () => console.log('OK Pressed') },
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

        console.log(body);
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
    const {
      id, insurance_name, status, adviser_code, request_code,
    } = this.props;

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
              Estado:
              {' '}
              {status}
            </Text>
            <Text note>
              Codigo asesor:
              {' '}
              {adviser_code}
            </Text>
            <View style={styles.container}>
              <View>
                <Button
                  title="Instrucciones para pago"
                  onPress={() => this.onPress({ request_code })}
                  color="#05071e"
                />
              </View>
              <View>
                <Button
                  title="Subir comprobante"
                  onPress={() => this.payment({ request_code })}
                  color="#999"
                />
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
            Estado:
            {' '}
            {status}
          </Text>
          <Text note>
            Codigo asesor:
            {' '}
            {adviser_code}
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
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});

export default RequestComponent;
