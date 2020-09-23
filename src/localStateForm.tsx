import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

export const LocalStateForm = () => {
  const [value, setValue] = useState('');
  return (
    <View>
      <TextInput value={value} onChangeText={(v) => setValue(v)} />
    </View>
  );
};
