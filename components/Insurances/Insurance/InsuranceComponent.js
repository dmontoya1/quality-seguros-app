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
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class InsuranceComponent extends Component {
  constructor() {
    super();
    this.state = { };
    this.onPress = this.onPress.bind(this);
  }


  onPress = () => {
    const { pdfUrl } = this.props;
    Actions.insurance_pdf({ pdfUrl });
  }

  render() {
    const {
      id, name, insurer, pdfUrl, plate, expirationDate,
    } = this.props;
    if (name === 'SOAT') {
      return (
        <ListItem thumbnail>
          <Body>
            <Text>{name}</Text>
            <Text note>
              Aseguradora:
              {' '}
              {insurer}
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
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.onPress()}
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
            {insurer}
          </Text>
          <Text note>
            Numero poliza:
            {' '}
            #######
          </Text>
          <Text note>
              Vencimiento:
            {' '}
            {expirationDate}
          </Text>
        </Body>
      </ListItem>
    );
  }
}


export default InsuranceComponent;
