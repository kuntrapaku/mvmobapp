import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function MessagesScreen() {
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.auth.user);

  // Replace with API later
  const mockUsers = [
    { id: 2, name: 'Ravi (Editor)' },
    { id: 3, name: 'Aisha (Director)' },
  ].filter((u) => u.id !== user?.id);

  return (
    <View style={styles.container}>
      <FlatList
        data={mockUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('Chat', {
                recipientId: item.id,
                recipientName: item.name,
              })
            }
          >
            <Text style={styles.chatName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },
});
