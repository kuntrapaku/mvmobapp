import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'; // ✅ required for manual init
import { Alert, Button, View, Text, TextInput } from 'react-native';

export default function App() {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    // ✅ Step 1: Manually initialize Firebase if needed
    const config = {
      appId: '1:850414007036:android:cbef0ac177f2e333145d79',
      apiKey: 'AIzaSyCfd6OnLysiOsQcxUZOD4SFefgbmP2j8xM',
      projectId: 'mymobapp-3d2d4',
      messagingSenderId: '850414007036',
    };

    try {
      firebase.app(); // ✅ will succeed if already initialized
      console.log('✅ Firebase app already initialized');
    } catch (err) {
      console.log('🛠️ Firebase app not initialized. Initializing now...');
      firebase.initializeApp(config);
    }

    // ✅ Step 2: Request permission for FCM Notifications
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ FCM Authorization status:', authStatus);
      }
    };

    requestPermission();

    // ✅ Step 3: Handle foreground FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'New Notification',
        remoteMessage.notification?.title || 'You have a new message!'
      );
    });

    return unsubscribe;
  }, []);

  // 🧪 Manual Test Prompt to backend API
  const testPrompt = async () => {
    try {
      const res = await fetch('http://10.0.2.2:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.text();
      setResponse(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to reach backend');
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
        {/* 🧪 Debug Prompt Box */}
        <View style={{ padding: 20 }}>
          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Type your prompt here"
            style={{
              borderWidth: 1,
              borderColor: '#000',
              backgroundColor: '#fff',
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
            }}
          />
          <Button title="Send Test Prompt" onPress={testPrompt} />
          <Text
            style={{
              marginTop: 12,
              padding: 10,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
            }}
          >
            {response}
          </Text>
        </View>
      </NavigationContainer>
    </Provider>
  );
}
