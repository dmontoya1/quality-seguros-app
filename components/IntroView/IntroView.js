import React, { Component } from 'react';
import { View, Image } from 'react-native';


import {
  Container, Header, Title, Content, Button, Icon, Left, Body, Text,
} from 'native-base';


import Swiper from 'react-native-swiper';

import {
  Router, Scene, Stack, Actions,
} from 'react-native-router-flux';
import deviceStorage from '../AsyncStorage/deviceStorage';

import {
  styles,
  buttonLoginStyle,
} from './styles';

export default class IntroView extends Component {
  finishStepper() {
    deviceStorage.saveItem('stepper', 'true');
    this.props.stepperComplete();
    Actions.logIn();
  }

  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons
        loop={false}
        showsPagination
        buttonWrapperStyle={{
          flexDirection: 'row', position: 'absolute', flex: 1, paddingHorizontal: 10, paddingBottom: 50, justifyContent: 'space-between', alignItems: 'flex-end',
        }}
        nextButton={<Text style={{ fontSize: 15, color: 'white' }}>Siguiente ›</Text>}
        prevButton={<Text style={{ fontSize: 15, color: 'white' }}>‹ Atras </Text>}
        dot={<View style={styles.dotStyle} />}
        activeDot={<View style={styles.dotActivateStyle} />}
      >
        <View style={styles.slide1}>
          <View style={styles.container}>
            <Header transparent>
              <Title style={styles.title}>
                  Guía de uso
              </Title>
            </Header>
            <View style={styles.containerInfo2}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/Quality-white.png')}
                  style={styles.imageIntro}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Bienvenido a nuestra plataforma,
                  {' '}
                  {'\n'}
                  a continuación te daremos una guía
                  {' '}
                  {'\n'}
                  rápida de uso para gestionar tu seguro
                </Text>
              </View>
            </View>
            <View style={styles.containerFinal} />
          </View>
        </View>
        <View style={styles.slide1}>
          <View style={styles.container}>
            <Header transparent>
              <Title style={styles.title}>
                  Paso 1
              </Title>
            </Header>
            <View style={styles.containerInfo2}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/Quality-white.png')}
                  style={styles.imageIntro}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Solicitar los seguros
                  {' '}
                  {'\n'}
                  de tu interés.
                </Text>

              </View>
            </View>
            <View style={styles.containerFinal} />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.container}>
            <Header transparent>
              <Title style={styles.title}>
                  Paso 2
              </Title>
            </Header>
            <View style={styles.containerInfo2}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/Quality-white.png')}
                  style={styles.imageIntro}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Tener centralizadas tus
                  {' '}
                  {'\n'}
                  pólizas vigentes
                </Text>
              </View>
            </View>
            <View style={styles.containerFinal} />
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.container}>
            <Header transparent>
              <Title style={styles.title}>
                  Paso 3
              </Title>
            </Header>
            <View style={styles.containerInfo2}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/Quality-white.png')}
                  style={styles.imageIntro}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Esperar unos minutos a que el
                  {' '}
                  {'\n'}
                  sistema confirme tu solicitud.
                </Text>
              </View>
            </View>
            <View style={styles.containerFinal} />
          </View>
        </View>
        <View style={styles.slide3}>
          <View style={styles.container}>
            <Header transparent>
              <Title style={styles.title}>
                  Paso 4
              </Title>
            </Header>
            <View style={styles.containerInfo}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/Quality-white.png')}
                  style={styles.imageIntro}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Solicitar asistencia en
                  {'\n'}
                  el momento que lo necesites.
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button light style={{ bouderColor: 'white' }} onPress={() => this.finishStepper()}>
                <Text>Finalizar</Text>
              </Button>
            </View>
            <View style={styles.containerFinal} />
          </View>
        </View>
      </Swiper>
    );
  }
}
