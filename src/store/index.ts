import {configureStore} from '@reduxjs/toolkit';
import usersReducer from './users';
const middlewares = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
export const store = configureStore({
  reducer: {
    // message: messageReducer,
    user: usersReducer,
  },
  devTools: __DEV__,
  middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
