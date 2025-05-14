// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';


type ProfileRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const route = useRoute<ProfileRouteProp>();
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:8080/api/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#ff5858" />;

  if (!user) return <Text style={{ textAlign: 'center', marginTop: 20 }}>User not found</Text>;

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
