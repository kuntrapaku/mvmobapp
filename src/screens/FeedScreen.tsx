import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostCard from '../components/PostCard';
import { RootStackParamList } from '../navigation/types';

const frames = [
  '🎬 Direction',
  '🎥 Camera',
  '📍 Locations',
  '🎧 Sound',
  '🎞️ Editing',
  '📝 Script',
  '👗 Costume',
  '🎭 Acting',
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function FeedScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const posts = [
    {
      name: 'Aisha',
      role: 'Director',
      content: 'Excited about our new short film shoot!',
      media: { type: 'image' as 'image', uri: 'https://picsum.photos/300/200' },
    },
    {
      name: 'Ravi',
      role: 'Editor',
      content: 'Final cut dropped 🎬',
      media: { type: 'video' as 'video', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    },
  ];

  return (
    <LinearGradient colors={['#f857a6', '#ff5858']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.role}>Film Professional</Text>
          <Text style={styles.location}>📍 Mumbai, India</Text>
          <Button title="Edit Profile" onPress={() => {}} />
        </View>

        {/* Frames Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.framesBar}>
          {frames.map((frame, index) => (
            <TouchableOpacity key={index} style={styles.frameItem}>
              <Text style={styles.frameText}>{frame}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate('CreateFrame')} style={styles.addFrameBtn}>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Share Box */}
        <View style={styles.shareBox}>
          <Text style={styles.sharePrompt}>🎨 Share your frame...</Text>
          <Button title="Create Frame" onPress={() => navigation.navigate('CreateFrame')} />
        </View>

        {/* Posts */}
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}

        {/* Logout */}
        <View style={styles.logoutSection}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 20 },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  role: { fontSize: 14, color: '#555' },
  location: { fontSize: 14, marginBottom: 8 },
  framesBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  frameItem: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  frameText: {
    fontWeight: '600',
    fontSize: 14,
  },
  addFrameBtn: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  plus: {
    fontSize: 24,
    color: '#ff5858',
    fontWeight: 'bold',
  },
  shareBox: {
    backgroundColor: '#fbe9f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  sharePrompt: { marginBottom: 10, fontSize: 16 },
  logoutSection: { marginTop: 30 },
});
