/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {configureStore} from './src/redux';
import {Tabs} from './src/shared/components/tabs';
import {NfcWrite} from './src/shared/components/nfc/write';
import {NfcRead} from './src/shared/components/nfc/read';

export const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Tabs
          tabs={[
            {
              title: 'read',
              render: (
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                  <NfcRead />
                </ScrollView>
              ),
            },
            {
              title: 'write',
              render: (
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                  <NfcWrite />
                </ScrollView>
              ),
            },
          ]}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
