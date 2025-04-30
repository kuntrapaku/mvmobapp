import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getConnectionRequests, getConnections, acceptRequest, ignoreRequest } from '../services/api/connections';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserDTO } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Connections'>;

export default function ConnectionsScreen() {
  const [requests, setRequests] = useState<UserDTO[]>([]);
  const [connections, setConnections] = useState<UserDTO[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (user) {
      loadConnections();
    }
  }, [user]);

  const loadConnections = async () => {
    try {
      const token = user?.token;
      const reqs = await getConnectionRequests(token);
      const cons = await getConnections(token);
      setRequests(reqs);
      setConnections(cons);
    } catch (e) {
      console.error('Error loading connections:', e);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await acceptRequest(id, user?.token);
      Alert.alert('Accepted', 'Connection accepted!');
      loadConnections();
    } catch (e) {
      Alert.alert('Error', 'Failed to accept.');
    }
  };

  const handleIgnore = async (id: number) => {
    try {
      await ignoreRequest(id, user?.token);
      loadConnections();
    } catch (e) {
      Alert.alert('Error', 'Failed to ignore.');
    }
  };

  const renderUserCard = (item: UserDTO, type: 'request' | 'connection') => {
    const content = (
      <View style={styles.card}>
        <Image
          source={{ uri: item.profilePictureUrl || 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
        {type === 'request' && (
          <View style={styles.actions}>
            <Button title="Accept" onPress={() => handleAccept(item.id)} />
            <Button title="Ignore" color="gray" onPress={() => handleIgnore(item.id)} />
          </View>
        )}
      </View>
    );

    return type === 'connection' ? (
      <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Profile', { userId: item.id })}>
        {content}
      </TouchableOpacity>
    ) : (
      content
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.section}>Connection Requests</Text>
      {requests.length === 0 ? (
        <Text>No new connection requests.</Text>
      ) : (
        <FlatList
          data={requests}
          renderItem={({ item }) => renderUserCard(item, 'request')}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <Text style={styles.section}>My Connections</Text>
      {connections.length === 0 ? (
        <Text>No connections yet.</Text>
      ) : (
        <FlatList
          data={connections}
          renderItem={({ item }) => renderUserCard(item, 'connection')}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  username: { fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row', gap: 8 },
});
