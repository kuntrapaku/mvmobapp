import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Validation', 'Please enter both username and password');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        username,
        password,
      });

      if (response.data?.success) {
        Alert.alert('Success', response.data.message, [
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Registration Failed', response.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Registration failed';
      Alert.alert('Error', msg);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
});
