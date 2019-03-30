import React,{Component} from 'react';
import {
  View, Text, StyleSheet, TextInput, Button,Image,TouchableHighlight
} from 'react-native';
import { FieldArray, reduxForm } from 'redux-form';
import { CheckBox } from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

export default class InsuranceFormETD extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      formSubmit:props.formSubmit,
      policy:props.policy,
      values_fields:{}
    };
    this.returnField = this.returnField.bind(this);
    this.textAdd = this.textAdd.bind(this);
  }

  textAdd(id,value){
    temp_values_fields = this.state.values_fields;
    temp_values_fields[id]=value;
    this.setState({
      values_fields:temp_values_fields,
    })
  }
  returnField(field){
    if (field.field_type === 'checkbox') {
      return (
        <View key={'VCF'+field.id}>
          <CheckBox
            key={'CBF'+field.id}
            title={field.name}
          />
        </View>
      );
    }
    if (field.field_type === 'image') {
      
      const options = {
        title: 'Seleccionar imagen',
        chooseFromLibraryButtonTitle:'Escoger de la galeria',
        takePhotoButtonTitle:'Tomar imagen',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      const imgPicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            console.warn('Se cancelo la carga de imagen');
          }
          else if (response.error) {
            console.warn('Error: ', response.error);
          }
          else {
            source_image = response.uri;
            temp_values_fields = this.state.values_fields;
            temp_values_fields[field.id]=source_image;
            this.setState({
              values_fields:temp_values_fields,
            })
          }
        });
      }
      return (
        <View key={'VTF'+field.id}>
          <TouchableHighlight 
            key={'TCHF'+field.id} 
            onPress={imgPicker}
            underlayColor={'transparent'}>
            <View>
              <Image
                key={'IF'+field.id}
                style={{width: 30, height: 30}}
                source={require('../../../assets/icons/add_image.png')}
              />
              <Text>{field.name}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View key={'VTI'+field.id}>
        <TextInput
          key={'TIF'+field.id}
          placeholder={field.name}
          onChangeText={(text) => this.textAdd(field.id,text)}
          keyboardType={field.field_type === 'number' ? 'numeric' : 'default'}
          autoCapitalize="none"
          value={this.state.values_fields.field_id}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {
          this.state.policy.related_metadata.map(item => {
            return(this.returnField(item));
          })
        }
        <View >
          <Button
            title="Enviar datos"
            onPress={() => this.state.formSubmit(this.state.values_fields)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 16,
  },
  line: {
    backgroundColor: '#dcdcdc',
    height: 2,
  },
  errors: {
    color: '#ff0000',
  },
});