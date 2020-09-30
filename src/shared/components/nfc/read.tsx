import * as React from 'react';
import {View, Alert} from 'react-native';
import {useNfc} from '../../hooks/useNfc';
import {useCallback} from 'react';
import {Button} from '../button';

export const NfcRead = () => {
  const {readTag} = useNfc();
  const readNfcTag = useCallback(async () => {
    try {
      const tag = await readTag();
      Alert.alert(tag);
    } catch (e) {
      Alert.alert('reading error', JSON.stringify(e));
    }
  }, [readTag]);
  return (
    <View>
      <Button text={'Read text'} onPress={readNfcTag} />
    </View>
  );
};
