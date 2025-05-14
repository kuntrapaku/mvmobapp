import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import { acceptRequest, getConnectionRequests, getConnections, ignoreRequest } from '../services/api/connections';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { UserDTO } from '../type';
import { ConnectionRequestDTO }  from '../type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Connections'>;

export default function ConnectionsScreen() {
  const [requests, setRequests] = useState<ConnectionRequestDTO[]>([]);
  const [connections, setConnections] = useState<UserDTO[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (user) {
      loadConnections();
    } else {
      setRequests([]);
      setConnections([]);
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

  const handleAccept = async (requestId: number) => {
    try {
      await acceptRequest(requestId, user?.token);
      loadConnections();
    } catch (e) {
      Alert.alert('Error', 'Failed to accept.');
    }
  };

  const handleIgnore = async (requestId: number) => {
    try {
      await ignoreRequest(requestId, user?.token);
      loadConnections();
    } catch (e) {
      Alert.alert('Error', 'Failed to ignore.');
    }
  };

  const renderRequestCard = (item: ConnectionRequestDTO) => (
    <TouchableOpacity key={item.requestId}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.senderProfilePictureUrl || 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.senderFullName}</Text>
          <Text style={styles.username}>@{item.senderUsername}</Text>
        </View>
        <View style={styles.actions}>
          <Button title="Accept" onPress={() => handleAccept(item.requestId)} />
          <Button title="Ignore" color="gray" onPress={() => handleIgnore(item.requestId)} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderConnectionCard = (item: UserDTO) => (
    <TouchableOpacity key={item.id}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.profilePictureUrl || 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.username}>@{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.section}>Connection Requests</Text>
      <FlatList
        data={requests}
        renderItem={({ item }) => renderRequestCard(item)}
        keyExtractor={(item) => item.requestId.toString()}
      />

      <Text style={styles.section}>My Connections</Text>
      <FlatList
        data={connections}
        renderItem={({ item }) => renderConnectionCard(item)}
        keyExtractor={(item) => item.id.toString()}
      />
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
