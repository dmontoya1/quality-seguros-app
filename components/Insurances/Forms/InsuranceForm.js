import React from 'react';
import {
  View, Text, StyleSheet, TextInput, Button,Image,TouchableHighlight
} from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { CheckBox } from 'react-native-elements';

import ImagePicker from 'react-native-image-picker';

import {
  Icon
} from 'native-base';

var source_image = '';
const fieldName = (props) => {
  const {
    ph, input, meta, type,
  } = props;
  if (type === 'checkbox') {
    return (
      <View>
        <CheckBox
          title={input.name}
          checked={this.state.checked}
        />
      </View>
    );
  }
  if (type === 'image') {
    
    const options = {
      title: 'Seleccionar imagen',
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
          console.warn('si');
        }
      });
    }
    return (
      <View>
      <TouchableHighlight onPress={imgPicker}>
        <Image
          style={{width: 70, height: 70}}
          source={require('../../../assets/icons/camara.png')}
        />
      </TouchableHighlight>
      </View>
    );
  }
  return (
    <View>
      <TextInput
        placeholder={ph}
        onChangeText={input.onChange}
        value={input.value}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        autoCapitalize="none"
        onBlur={input.onBlur}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
      <View style={styles.line} />
      {meta.touched && meta.error && <Text style={styles.errors}>{meta.error}</Text>}
    </View>
  );
};

const InstanceForm = (props) => {
  const { policy, formSubmit} = props;
  const { related_metadata } = policy;
  const mappedFields = related_metadata.map(field => (
    <Field
      key={field.id}
      name={field.name}
      component={fieldName}
      ph={field.name}
      type={field.field_type}
      label={field.name}
    />
  ));
  console.warn(related_metadata);
  return (
    <View>
      {mappedFields}
      <Button
        title="Solicitar"
        onPress={props.handleSubmit(() => {formSubmit(source_image)})}
      />
    </View>
  );
};

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

export default reduxForm({
  form: 'insuranceForm',
})(InstanceForm);
