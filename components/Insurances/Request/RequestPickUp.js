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

import axios from '../../Axios/axios';

export default class RequestPickUp extends Component {
  _menu = null;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      address: '',
      date: new Date(),
      time: '',
      phone: '',
    };

    this.submit = this.submit.bind(this);

    AsyncStorage.getItem('id_token', (err, result) => {
      this.setState({
        token: result,
      });
    });
  }

  submit() {
    console.log('submit');
    console.log(this.state.date);
    const {
      address,
      date,
      time,
      phone,
    } = this.state;

    console.log(address);
    const dataToSend = {
      address,
      pickup_date: date,
      pickup_time: time,
      contact_phone: phone,
      request_id: this.props.id,
    };
    axios.post('api/insurances/request-domi/', dataToSend)
      .then((response) => {
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
        Alert.alert(
          'Error',
          'Ha ocurrido un error, intenta nuevamente',
          [
            { text: 'Aceptar', onPress: () => {} },
          ],
          { cancelable: false },
        );
        console.log(error);
      });
  }

  render() {
    const days = 7; // Days you want to subtract
    const date = new Date();
    const last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const day = last.getDate();
    return (

      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Text style={{ color: '#fff' }}>
                Atras
              </Text>

            </TouchableOpacity>
          </Left>
          <Body style={{ position: 'absolute', left: wp('30%') }}>
            <Image
              source={require('../../../assets/images/Quality-text1.png')}
              resizeMode="contain"
              style={{ width: 150, height: 30 }}
            />
          </Body>
          <Right>
            <Text />
          </Right>
        </Header>
        <Content styles={styles.container}>
          <View style={{
            paddingLeft: 10, paddingRight: 30, alignContent: 'center',
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
              <Item fixedLabel>
                <Input
                  placeholder="Teléfono de contacto"
                  placeholderTextColor="#05071e"
                  keyboardType="numeric"
                  style={styles.textInput}
                  borderColor="#05071e"
                  autoCapitalize="none"
                  onChangeText={phone => this.setState({ phone })}
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
              maxDate={day}
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
