import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react';

export interface Props {
  text: string;
  onPress: () => void;
}

export const Button = ({text, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
});
