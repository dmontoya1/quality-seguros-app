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
} from 'native-base';

import {
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class CardComponent extends Component {
  constructor() {
    super();
    this.state = { };
    this.onPress = this.onPress.bind(this);
  }


  onPress = () => {
    const { request, id } = this.props;
    request(id);
  }

  render() {
    const {
      id, name, category, image,
    } = this.props;
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../assets/images/icon.jpg')} />
            <Body>
              <Text>{name}</Text>
              <Text note>{category}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: image }} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Button
            transparent
            onPress={() => this.onPress()}
          >
            <Icon name="ios-add-circle-outline" style={{ color: '#020718' }} />
            <Text style={{ color: '#020718' }}>Solicitar</Text>
          </Button>
        </CardItem>
      </Card>
    );
  }
}


export default CardComponent;
