import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileCard({ name, email }: { name: string; email: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    color: '#666',
    marginTop: 4,
  },
});
