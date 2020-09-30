import * as React from 'react';
import {View, TextInput} from 'react-native';
import {useNfc} from '../../hooks/useNfc';
import {useState} from 'react';
import {Button} from '../button';

export const NfcWrite = () => {
  const {writeTag} = useNfc();
  const [value, setValue] = useState('');
  return (
    <View>
      <View
        style={{
          marginBottom: 10,
          borderColor: '#000',
          borderWidth: 1,
          borderStyle: 'solid',
        }}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Type text..."
        />
      </View>
      <Button text={'Write text'} onPress={async () => await writeTag(value)} />
    </View>
  );
};
