import React, { Component } from 'react';


import {
  Left,
  Body,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  ListItem, Right,
} from 'native-base';

import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { Actions } from 'react-native-router-flux';

class InsuranceComponent extends Component {
  constructor() {
    super();
    this.state = { };
    this.onPressSOAT = this.onPressSOAT.bind(this);
    this.onPress = this.onPress.bind(this);
  }


  onPressSOAT = () => {
    const { pdfUrl } = this.props;
    Actions.insurance_pdf({ pdfUrl });
  }

  onPress = () => {
    const { insurer, adviser_phone } = this.props;
    Alert.alert(
      `Contacto de ${insurer.name}`,
      `Para contactarse con la aseguradora, debes llamar desde tu celular "${insurer.cellphone_number}", o a la línea nacional "${insurer.national_number}"`,
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Llamar al asesor', onPress: () => RNImmediatePhoneCall.immediatePhoneCall(adviser_phone) },
        { text: 'Llamar a la aseguradora', onPress: () => { RNImmediatePhoneCall.immediatePhoneCall(insurer.cellphone_number); } },
      ],
      { cancelable: true },
    );
  }

  render() {
    const {
      id, name, insurer, pdfUrl, plate, expirationDate, police_number,
    } = this.props;
    if (name === 'SOAT') {
      return (
        <ListItem thumbnail>
          <Body>
            <Text>{name}</Text>
            <Text note>
              Aseguradora:
              {' '}
              {insurer.name}
            </Text>
            <Text note>
              Placa Vehiculo:
              {' '}
              {plate}
            </Text>
            <Text note>
              Vencimiento:
              {' '}
              {expirationDate}
            </Text>
            <TouchableOpacity
              style={styles.contact}
              onPress={() => this.onPress({ insurer })}
            >
              <Text style={styles.TextContact}>Contactarse con la aseguradora</Text>
            </TouchableOpacity>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.onPressSOAT()}
            >
              <Text>VER POLIZA</Text>
            </Button>
          </Right>

        </ListItem>
      );
    }

    return (
      <ListItem thumbnail>
        <Body>
          <Text>{name}</Text>
          <Text note>
            Aseguradora:
            {' '}
            {insurer.name}
          </Text>
          <Text note>
            Numero poliza:
            {' '}
            {police_number}
          </Text>
          <Text note>
            Vencimiento:
            {' '}
            {expirationDate}
          </Text>
          <TouchableOpacity
            style={styles.contact}
            onPress={() => this.onPress({ insurer })}
          >
            <Text style={styles.TextContact}>Contactarse con la aseguradora</Text>
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  contact: {
    marginTop: 16,
    flex: 1,
    backgroundColor: '#ddd',
    width: wp('68%'),
    padding: 10,
    borderRadius: 10,
  },
  TextContact: {
    fontSize: 15,
  },
});


export default InsuranceComponent;
