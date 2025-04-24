import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import connectionsReducer from './slices/connectionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    connections: connectionsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
