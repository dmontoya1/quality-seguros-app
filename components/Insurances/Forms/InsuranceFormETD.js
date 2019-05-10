import React,{Component} from 'react';
import {
  View, StyleSheet, TextInput, Button, Picker
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

export default class InsuranceFormETD extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      formSubmit:props.formSubmit,
      policy:props.policy,
      values_fields:{},
      is_required_list:[],
      checkedValue: false
    };

    this.returnField = this.returnField.bind(this);
    this.textAdd = this.textAdd.bind(this);
    this.SelectAdd = this.SelectAdd.bind(this);
    this.checkAdd = this.checkAdd.bind(this);
    this.validate_required = this.validate_required.bind(this);
  }

  componentDidMount(){
    this.state.policy.related_metadata.map(item => {
      this.validate_required(item.is_required,item.id);
    })
  }

  checkAdd(id,value){
    temp_values_fields = this.state.values_fields;
    temp_values_fields[id]=!value;
    this.setState({
      values_fields:temp_values_fields,
    })
  }

  SelectAdd(id,value){
    temp_values_fields = this.state.values_fields;
    temp_values_fields[id]=value;
    this.setState({
      values_fields:temp_values_fields,
    })
  }

  textAdd(id,value){
    temp_values_fields = this.state.values_fields;
    temp_values_fields[id]=value;
    this.setState({
      values_fields:temp_values_fields,
    })
  }

  validate_required(is_required,id){
    if(is_required){
      var list_temp = this.state.is_required_list;
      list_temp.push(id);
      this.setState({
        is_required_list:list_temp
      });
    }
  }

  returnField(field){
    var field_id;
    field_id = field.id;
    if (field.field_type === 'select') {
      return (
        <View key={'VCF'+field.id} style={{marginVertical: 10,flex:1}}>
          <Picker
            style={{height: 50}}
            selectedValue={this.state.values_fields[field_id]}
            onValueChange={
              (itemValue) => this.SelectAdd(field_id,itemValue)}>
            <Picker.Item key={'PICK'+field.id} label='Seleccione la opción:' />
            {
              field.related_choices.map(item => {
                return(
                  <Picker.Item
                    key={'PICK'+item.id}
                    label={item.value}
                    value={item.id}/>
                );
              })
            }
          </Picker>
        </View>
      );
    }
    if (field.field_type === 'checkbox') {
      if(!this.state.values_fields[field_id]){
        checked = this.state.checkedValue;
      } else {
        checked = this.state.values_fields[field_id];
      }
      return (
        <View key={'VCF'+field.id} style={{marginVertical: 10,flex:1}}>
          <CheckBox
            style={styles.checbox}
            key={'CBF'+field.id}
            title={field.name}
            checked={checked}
            onPress={(id) => this.checkAdd(field.id,checked)}
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
            return;
          }
          else if (response.error) {
            return;
          } else {
            source_image = response.uri;
            temp_values_fields = this.state.values_fields;
            temp_values_fields[field.id]=source_image;
            this.setState({
              values_fields:temp_values_fields,
            })
          }
        });
      }
      var id = field.id;
      var colorButton = this.state.values_fields[id] ? 'green' : 'dodgerblue';
      return (
        <View key={'VTF'+field.id} style={{marginVertical: 10,flex:1}}>
          <Button
            color={colorButton}
            title={field.name}
            onPress={imgPicker}
          />
        </View>
      );
    }
    return (
      <View key={'VTI'+field.id} style={{marginVertical: 10,flex:1}}>
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
        <View>
        {
          this.state.policy.related_metadata.map(item => {
            return (this.returnField(item));
          })
        }
        </View>
        <View>
          <Button
            raise
            primary
            title="Enviar datos"
            onPress={() => this.state.formSubmit(
              this.state.values_fields,
              this.state.is_required_list)}
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
