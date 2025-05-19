import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GradientBackground from '../components/GradientBackground';
import { AppDispatch, RootState } from '../store/store';
import { loginUser } from '../store/slices/authSlice';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation', 'Please enter both username and password.');
      return;
    }

    const result = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(result)) {
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Login Failed', result.payload as string);
    }
  };

  return (
    <GradientBackground>
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
    </GradientBackground>
  );
}


const styles = StyleSheet.create({
  container: {flex:1, justifyContent: 'center', padding:20},
  input: {
    borderWidth:1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },


});
