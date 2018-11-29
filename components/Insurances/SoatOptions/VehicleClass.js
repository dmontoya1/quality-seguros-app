import React, { Component } from 'react';

import {
  Container, Header, Left, Body, Right, Button,
  Icon, Card, CardItem, View, Text, Input,
} from 'native-base';
import {
  Image, StyleSheet, Alert, ActivityIndicator, Picker, ScrollView,
} from 'react-native';

class VehicleClass extends React.Component {
  onSelect = (itemValue) => {
    this.props.onSelect(itemValue);
  };


  render() {
    const { Item } = Picker;
    return (
      <View>
        <Text>Selecciona la clase de Vehiculo: </Text>
        <Picker
          selectedValue={this.props.selectedId}
          onValueChange={(itemValue, itemIndex) => this.onSelect(itemValue)}
          prompt="Selecciona la clase de vehiculo"
        >
          <Item label="Selecciona una opcion" />
          {this.props.data.map(item => (
            <Item
              key={item.id}
              label={`* ${item.name}`}
              value={item.id}
              selected={this.props.selectedId === item.id}
            >
              *
              {' '}
              {item.name}
              {' '}
TESTTTT
            </Item>
          ))}
        </Picker>
      </View>
    );
  }
}

export default VehicleClass;
