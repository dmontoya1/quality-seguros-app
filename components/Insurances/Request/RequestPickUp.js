import React, { Component } from 'react';

import {
  Container, Header, Content, Button, Text, Left, Body, Right, Form, Item, Input, View,
} from 'native-base';


import {
  Image,
  StyleSheet,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Animated,
} from 'react-native';


import Menu, { MenuItem } from 'react-native-material-menu';

import { Actions } from 'react-native-router-flux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import axios from '../../Axios/axiosDomi';

export default class RequestPickUp extends Component {
  _menu = null;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      address: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm:ss'),
    };

    this.submit = this.submit.bind(this);

    AsyncStorage.getItem('id_token', (err, result) => {
      this.setState({
        token: result,
      });
    });
  }


  submit() {
    console.log('Submit');
    const {
      address,
      date,
      time,
    } = this.state;
    const { request } = this.props;
    const HourLater = moment(new Date()).add(1, 'hours').format('HH:mm:ss');
    if (time < HourLater) {
      Alert.alert(
        'Error',
        'La hora de recogida debe ser por lo menos una hora después.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else if (address === '') {
      Alert.alert(
        'Error',
        'Debes ingresar la dirección de recogida.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else {
      const price = request.price.replace(/[$.]+/g, '');
      const fullPrice = parseInt(price, 10);
      const dateCollect = `${String(date)}T${String(time)}:00.000000Z`;
      const dataToSend = {
        first_name_client: request.client.first_name,
        last_name_client: request.client.last_name,
        dni_client: request.client.document_id,
        celphone_client: request.client.phone_number,
        cash_to_collect: fullPrice,
        date_to_collect: dateCollect,
        address_client: address,
        complement_address_client: 'complemento',
        instructions_service: 'Recaudo Dinero SOAT',
      };
      const formData = new FormData();
      for (const key in dataToSend) {
        formData.append(key, dataToSend[key]);
      }
      console.log('Envio de solicitud');
      axios.post('api/bs/create/order/', formData)
        .then((response) => {
          console.log('GOOD');
          console.log(response.data);
          Alert.alert(
            'Atención',
            'Tu solicitud ha sido creado exitosamente. En el dia y la hora seleccionara un domiciliario recogera tu dinero.',
            [
              { text: 'Aceptar', onPress: () => Actions.home() },
            ],
            { cancelable: false },
          );
        })
        .catch((error) => {
          console.log('Error');
          console.log(error);
          console.log(error.response.data);
          if (error.response.data.errorCode === 'NVDATE002') {
            Alert.alert(
              'Error',
              'La hora de recogida no debe ser de días ni horas pasadas.',
              [
                { text: 'Aceptar', onPress: () => {} },
              ],
              { cancelable: false },
            );
          } else if (error.response.data.errorCode === 'NVDATE003') {
            Alert.alert(
              'Error',
              'La fecha y hora está fuera de las horas de programación de atención al cliente.',
              [
                { text: 'Aceptar', onPress: () => {} },
              ],
              { cancelable: false },
            );
          } else {
            Alert.alert(
              'Error',
              `Ha ocurrido un error. Intenta nuevamente mas tarde. Error Code "${error.response.data.errorCode}" `,
              [
                { text: 'Aceptar', onPress: () => {} },
              ],
              { cancelable: false },
            );
          }
        });
    }
  }

  render() {
    const tomorrow = moment(new Date()).add(7, 'day').format('YYYY-MM-DD');
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Text style={{ color: '#fff' }}>
                Atrás
              </Text>

            </TouchableOpacity>
          </Left>
          <Body style={{ flex: 1 }}>
            <Image
              source={require('../../../assets/images/Quality-text1.png')}
              resizeMode="contain"
              style={{ width: 150, height: 30 }}
            />
          </Body>
          <Right style={{ flex: 1 }}>
            <Text />
          </Right>
        </Header>
        <Content styles={styles.container}>
          <View style={{
            paddingLeft: 10, paddingRight: 30, alignContent: 'center', marginTop: 30,
          }}
          >
            <Form style={{ paddingBottom: 40 }}>
              <Item fixedLabel>
                <Input
                  keyboardType="default"
                  placeholder="Dirección de recogida"
                  placeholderTextColor="#05071e"
                  style={styles.textInput}
                  autoCapitalize="none"
                  borderColor="#05071e"
                  onChangeText={address => this.setState({ address })}
                />
              </Item>
            </Form>
            <Text style={styles.instructions}>Fecha de Recogida</Text>
            <DatePicker
              style={{
                width: wp('90%'), paddingLeft: 10, paddingRight: 30, alignContent: 'center', marginBottom: 20,
              }}
              date={this.state.date}
              mode="date"
              placeholder="placeholder"
              format="YYYY-MM-DD"
              minDate={new Date()}
              maxDate={tomorrow}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => { this.setState({ date }); }}
            />
            <Text style={styles.instructions}>Hora de Recogida</Text>
            <DatePicker
              style={{
                width: wp('90%'), paddingLeft: 10, paddingRight: 30, alignContent: 'center', marginBottom: 20,
              }}
              date={this.state.time}
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              onDateChange={(time) => { this.setState({ time }); }}
            />
          </View>
          <View style={{ paddingLeft: 22, paddingRight: 25, paddingBottom: 20 }}>
            <TouchableOpacity block style={styles.TouchableOpacity} onPress={this.submit}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Solicitar</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>

    );
  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#05071e',
    paddingTop: 5,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    paddingLeft: 10,
  },
  TouchableOpacity: {
    backgroundColor: '#05071e',
    color: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },

});
