import {useCallback, useEffect} from 'react';
import nfcManager, {
  NfcEvents,
  TagEvent,
  NfcTech,
  Ndef,
} from 'react-native-nfc-manager';
import {Alert} from 'react-native';

export interface NfcHook {
  writeTag: (str: string) => Promise<void>;
  readTag: () => Promise<string>;
}

const getNdefPayload = (valueToWrite: string) => {
  return Ndef.encodeMessage([Ndef.uriRecord(valueToWrite)]);
};

const getNdefMessage = (event: TagEvent) => {
  return Ndef.stringify(Ndef.encodeMessage(event.ndefMessage), ',');
};

export const useNfc = (): NfcHook => {
  const cleanUp = useCallback(async () => {
    try {
      await nfcManager.cancelTechnologyRequest();
    } catch (e) {
      console.warn(e);
    }
  }, []);
  useEffect(() => {
    nfcManager.start();
    nfcManager
      .isEnabled()
      .then((isNfcEnabled) => {
        console.log('isNfcEnabled', isNfcEnabled ? 'yes' : 'no');
      })
      .catch((e) => {
        Alert.alert('nfc check enabled', JSON.stringify(e));
      });
    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      cleanUp().then(() => {});
    };
  }, [cleanUp]);
  const writeTag = useCallback(
    async (str: string) => {
      try {
        let resp = await nfcManager.requestTechnology(NfcTech.Ndef, {});
        console.log(resp);
        console.warn(resp);
        let ndef = await nfcManager.getNdefMessage();
        console.warn(ndef);
        let bytes = getNdefPayload(str);
        await nfcManager.writeNdefMessage(bytes);
        Alert.alert('successfully write ndef');
        await cleanUp();
      } catch (e) {
        Alert.alert('error writing ndef: ', JSON.stringify(e));
        await cleanUp();
      }
    },
    [cleanUp],
  );
  const readTag = useCallback(() => {
    return new Promise<string>((resolve) => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
        resolve(getNdefMessage(tag));
        cleanUp().then(() => {});
      });
    });
  }, []);
  return {
    writeTag,
    readTag,
  };
};
