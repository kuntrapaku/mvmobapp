import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Video from 'react-native-video';

type Props = {
  name: string;
  role: string;
  content: string;
  media?: { type: 'image' | 'video'; uri: string };
};

export default function PostCard({ name, role, content, media }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.userInfo}>{name} • {role}</Text>
      <Text style={styles.content}>{content}</Text>

      {media?.type === 'image' && (
        <Image source={{ uri: media.uri }} style={styles.media} />
      )}
      {media?.type === 'video' && (
        <Video
          source={{ uri: media.uri }}
          style={styles.media}
          resizeMode="cover"
          repeat
          muted
        />
      )}

      <View style={styles.actions}>
        <Text>❤️ 0</Text>
        <Text>💬 0</Text>
        <Text>🔁 Share</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  userInfo: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
