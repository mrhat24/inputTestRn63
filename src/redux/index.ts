import {Platform} from 'react-native';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import {createLogger} from 'redux-logger';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {reducer as formReducer, FormStateMap} from 'redux-form';

const rootReducer = combineReducers<AppStore, AnyAction>({
  form: formReducer,
});

export interface AppStore {
  form: FormStateMap;
}

const logger = createLogger();

export type AppState = ReturnType<typeof rootReducer>;

const middleware = [thunk as ThunkMiddleware<AppState>];
if (Platform.OS === 'web' && process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const defaultState = {};

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const configureStore = () =>
  createStore<AppStore, AnyAction, {}, {}>(
    rootReducer,
    defaultState as AppState,
    enhancer,
  );
