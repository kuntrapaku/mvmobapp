// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform, Button, View, Text,TextInput } from 'react-native';

export default function App() {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');

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

  // 🚀 Test POST to /api/chat/ask
  const testPrompt = async () => {
    try {
      const res = await fetch('http://10.0.2.2:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.text(); // Spring Boot might return plain text
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
        {/* 🧪 Test Button */}
        <View style={{ padding: 20 }}>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Type your prompt here"
          style={{
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#fff",
            padding: 10,
            marginBottom: 10,
            borderRadius: 8
          }}
        />
          <Button title="Send Test Prompt" onPress={testPrompt} />
          <Text style={{ marginTop: 12, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8 }}>
  {response}
</Text>

        </View>
      </NavigationContainer>
    </Provider>
  );
}
