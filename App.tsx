// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    // 🔥 Request permission for FCM Notifications
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestPermission();

    // 🔥 Handle foreground FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', remoteMessage.notification?.title || 'You have a new message!');
    });

    return unsubscribe; // cleanup on unmount
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
