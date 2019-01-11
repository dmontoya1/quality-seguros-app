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

import axios from '../../Axios/axios';

export default class RequestPickUp extends Component {
  _menu = null;

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      address: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm'),
    };

    this.submit = this.submit.bind(this);

    AsyncStorage.getItem('id_token', (err, result) => {
      this.setState({
        token: result,
      });
    });
  }

  submit() {
    const {
      address,
      date,
      time,
    } = this.state;

    if (address === '') {
      Alert.alert(
        'Error',
        'Debes ingresar la dirección de recogida.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else {
      const dataToSend = {
        address,
        pickup_date: date,
        pickup_time: time,
        request_id: this.props.id,
      };
      console.log(dataToSend);
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
  }

  render() {
    const tomorrow = moment(new Date()).add(7, 'day').format('YYYY-MM-DD');

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
