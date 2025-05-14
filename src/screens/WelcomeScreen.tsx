import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.text}>👋 Welcome to MvMobApp</Text>
        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
          <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // make text readable on gradient
  },
  buttonWrapper: {
    width: '60%',
    gap: 10,
  },
});
