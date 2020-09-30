import {TextInput} from 'react-native';
import React from 'react';
import {WrappedFieldProps} from 'redux-form';

export const BaseInput = (props: WrappedFieldProps) => {
  const {
    input: {value, onChange},
  } = props;
  return <TextInput defaultValue={value} onChange={onChange} />;
};
