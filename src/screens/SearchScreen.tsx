import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import GradientBackground from '../components/GradientBackground';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Search failed', 'Could not fetch results.');
    }
  };

  const handleConnect = async (recipientId: number) => {
    try {
      await axios.post(
        `http://10.0.2.2:8080/api/connections/send`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          params: { recipientId },
        }
      );
      Alert.alert('Success', `Request sent to user ${recipientId}`);
    } catch (err) {
      Alert.alert('Error', 'Failed to send connection request');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.inner}>
        <TextInput
          placeholder="Search users..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.fullName}>{item.fullName || 'No name available'}</Text>
              <Button title="Connect" onPress={() => handleConnect(item.id)} />
            </View>
          )}
        />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  fullName: {
    color: '#fff',
    marginBottom: 8,
  },
});
