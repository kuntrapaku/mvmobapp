// src/screens/UserProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

export default function UserProfileScreen() {
  const route = useRoute<UserProfileRouteProp>();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.profilePictureUrl || 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
      {user.location ? <Text style={styles.location}>📍 {user.location}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: '600' },
  username: { fontSize: 16, color: 'gray', marginBottom: 10 },
  bio: { fontStyle: 'italic', marginTop: 8 },
  location: { marginTop: 8 },
});
