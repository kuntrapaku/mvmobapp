import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  setPendingConnections,
  acceptConnection,
  declineConnection,
} from '../store/slices/connectionsSlice';
import ConnectionRequestCard from '../components/ConnectionRequestCard';

const ConnectionsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pendingConnections = useSelector((state: RootState) => state.connections.pending);

  useEffect(() => {
    // Fetch pending connections from API or use mock data
    const mockData = [
      { id: '1', name: 'John Doe', role: 'Director' },
      { id: '2', name: 'Jane Smith', role: 'Editor' },
    ];
    dispatch(setPendingConnections(mockData));
  }, [dispatch]);

  const handleAccept = (id: string) => {
    dispatch(acceptConnection(id));
  };

  const handleDecline = (id: string) => {
    dispatch(declineConnection(id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pendingConnections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConnectionRequestCard
            name={item.name}
            role={item.role}
            onAccept={() => handleAccept(item.id)}
            onDecline={() => handleDecline(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ConnectionsScreen;
