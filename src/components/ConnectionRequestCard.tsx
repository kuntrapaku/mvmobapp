import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  name: string;
  role: string;
  onAccept: () => void;
  onDecline: () => void;
}

const ConnectionRequestCard: React.FC<Props> = ({ name, role, onAccept, onDecline }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
      <View style={styles.buttons}>
        <Button title="Accept" onPress={onAccept} />
        <Button title="Decline" onPress={onDecline} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  role: {
    color: '#555',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ConnectionRequestCard;
