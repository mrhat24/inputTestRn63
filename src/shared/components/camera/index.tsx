import {RNCamera} from 'react-native-camera';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import vision from '@react-native-firebase/ml-vision';

const cardRegExp = new RegExp(/(\d{4}.?\d{4}.?\d{4}.?\d{4})/);
const datesRegExp = new RegExp(/(\d{1,2}.+?\/.+?\d{1,2})/);

export const Camera = () => {
  const cameraRef = useRef<RNCamera>();
  const [recognizedCard, setRecognizedCard] = useState<string>('');
  const [recognizedDate, setRecognizedDate] = useState<string>('');
  const onRecognize = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({
        pauseAfterCapture: false,
        base64: true,
        // doNotSave: true,
        width: 1200,
      });
      console.log(data);
      const processed = await vision().textRecognizerProcessImage(data.uri);
      console.log('Found text in document: ', processed.text);

      processed.blocks.forEach((block: any) => {
        console.log('Found block with text: ', block.text);
        console.log('Confidence in block: ', block.confidence);
        console.log('Languages found in block: ', block.recognizedLanguages);
      });
      const cardResult = cardRegExp.exec(processed.text);
      const datesResult = datesRegExp.exec(processed.text);
      console.log(cardResult);
      console.log(datesResult);
      if (cardResult) {
        setRecognizedCard(cardResult[0]);
      }
      if (datesResult) {
        setRecognizedDate(datesResult[0]);
      }
    }
  };
  return (
    <View>
      <View
        style={{
          width: 200,
          height: 200,
          position: 'relative',
          overflow: 'hidden',
        }}>
        <RNCamera
          style={{width: 200, height: 200}}
          googleVisionBarcodeType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL
          }
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          ref={(ref) => {
            if (ref) {
              cameraRef.current = ref;
            }
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
      </View>
      <View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#ccc',
              width: '100%',
              alignItems: 'center',
            }}
            onPress={() => onRecognize()}>
            <Text>recognize</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            {recognizedCard} {recognizedDate}
          </Text>
        </View>
      </View>
    </View>
  );
};
