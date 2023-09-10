import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import usersReducer from './users';
import tutorsReducer from './tutors';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middlewares = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: usersReducer,
  tutor: tutorsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
