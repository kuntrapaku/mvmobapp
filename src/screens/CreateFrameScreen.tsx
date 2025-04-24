import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function CreateFrameScreen() {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    console.log('Create new frame:', text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What's your frame about?"
        style={styles.input}
        multiline
        numberOfLines={4}
        value={text}
        onChangeText={setText}
      />
      <Button title="Post Frame" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
});
