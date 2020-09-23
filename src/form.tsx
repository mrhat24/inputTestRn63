import {View, Text} from 'react-native';
import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {BaseInput} from './input';

const FormView = () => {
  return (
    <View>
      <Text>form view</Text>
      <Field component={BaseInput} name={'test'} />
    </View>
  );
};

const Form = reduxForm<any, any>({
  form: 'testForm',
})(FormView);

export const TestForm = () => {
  return React.createElement(Form, {});
};
