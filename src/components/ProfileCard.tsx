import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ProfileCard({ name, email }: { name: string; email: string }) {
  return (
    <LinearGradient colors={['#f857a6', '#ff5858']} style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 20,
    borderRadius: 14,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  email: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});
