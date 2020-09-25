import NfcManager, {NfcEvents, TagEvent} from 'react-native-nfc-manager';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const NfcView = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
      console.warn('tag', tag);
      addLog('tags: ' + tag.ndefMessage.join(', '));
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  }, []);

  const addLog = (log: string) => {
    setLogs((l) => [...l, log]);
  };
  const readNfc = useCallback(async () => {
    try {
      addLog('try read');
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      addLog('err:' + ex.message ?? ex.toString());
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }, []);
  const stopReadNfc = useCallback(async () => {
    try {
      addLog('try stop');
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      addLog('err:' + ex.message ?? ex.toString());
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }, []);
  return (
    <View>
      <View style={{marginBottom: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>logs:</Text>
        {logs.map((log, i) => {
          return (
            <View style={{marginBottom: 10}} key={log + i}>
              <Text>{log}</Text>
            </View>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{padding: 15, backgroundColor: 'red'}}
          onPress={readNfc}>
          <Text>read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 15, backgroundColor: 'red'}}
          onPress={stopReadNfc}>
          <Text>stop read</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
