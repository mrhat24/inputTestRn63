const mockPromise = (result) => () =>
  new Promise((resolve) => {
    if (result !== undefined) {
      resolve(result);
    } else {
      resolve();
    }
  });

jest.mock('react-native-nfc-manager', () => {
  return {
    __esModule: true,
    default: {
      isEnabled: jest.fn(mockPromise(true)),
      start: jest.fn(mockPromise()),
      requestTechnology: jest.fn(mockPromise('Ndef')),
      getNdefMessage: jest.fn(mockPromise({ndefMessage: []})),
      writeNdefMessage: jest.fn(mockPromise()),
      cancelTechnologyRequest: jest.fn(mockPromise()),
      setEventListener: jest.fn(),
    },
    NfcEvents: {
      DiscoverTag: 'NfcManagerDiscoverTag',
    },
    NfcTech: {
      Ndef: 'Ndef',
    },
    Ndef: {
      encodeMessage: jest.fn(() => []),
      stringify: jest.fn(() => 'string'),
      uriRecord: jest.fn(() => ({type: [], payload: []})),
    },
  };
});

jest.mock('react-native', () => {
  return {
    Alert: {
      alert: (...arg) => {
        console.log(...arg);
      },
    },
  };
});
