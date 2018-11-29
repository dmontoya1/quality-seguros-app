import React from 'react';
import {
  View, Text, StyleSheet, TextInput, Button,
} from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { CheckBox } from 'react-native-elements';


const fieldName = (props) => {
  console.log(props);
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
  console.log(props);
  const { policy, formSubmit } = props;
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

  return (
    <View>
      {mappedFields}
      <Button
        title="Solicitar"
        onPress={props.handleSubmit(formSubmit)}
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
