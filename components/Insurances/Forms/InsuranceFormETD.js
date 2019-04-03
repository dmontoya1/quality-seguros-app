import React,{Component} from 'react';
import {
  View, StyleSheet, TextInput, Button
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
      checked:false
    };
    console.warn(this.state.policy);

    this.returnField = this.returnField.bind(this);
    this.textAdd = this.textAdd.bind(this);
    this.checkAdd = this.checkAdd.bind(this);
    this.validate_required = this.validate_required.bind(this);
  }

  componentDidMount(){
    this.state.policy.related_metadata.map(item => {
      this.validate_required(item.is_required,item.id);
    })
  }
  checkAdd(id){
    temp_values_fields = this.state.values_fields;
    temp_values_fields[id]=!this.state.checked;
    this.setState({
      values_fields:temp_values_fields,
      checked:!this.state.checked 
    })
    console.warn(this.state.values_fields);
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
    if (field.field_type === 'checkbox') {
      return (
        <View key={'VCF'+field.id} style={styles.viewCheck}>
          <CheckBox
            style={styles.checbox}
            key={'CBF'+field.id}
            title={field.name}
            checked={this.state.checked}
            onPress={(id) => this.checkAdd(field.id)}
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
        <View key={'VTF'+field.id} style={{marginVertical: 10}}>
          <Button
            color={colorButton}
            title={field.name}
            onPress={imgPicker}
          />
        </View>
      );
    }
    return (
      <View key={'VTI'+field.id} style={{marginVertical: 10}}>
        <TextInput
          key={'TIF'+field.id}
          placeholder={field.name}
          onChangeText={(text) => this.textAdd(field.id,text,field)}
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
            return (this.returnField(item));
          })
        }
        <View >
          <Button
            raise
            primary
            title="Enviar datos"
            onPress={() => this.state.formSubmit(this.state.values_fields,this.state.is_required_list)}
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
