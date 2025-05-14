import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import GradientBackground from '../components/GradientBackground';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserDTO } from '../types';

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

export default function UserProfileScreen() {
  const route = useRoute<UserProfileRouteProp>();
  const { user }: { user: UserDTO } = route.params;

  const [selectedTab, setSelectedTab] = useState<
    'posts' | 'photos' | 'videos' | 'connections'
  >('posts');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'posts':
        return <Text style={styles.emptyText}>No posts to display yet</Text>;
      case 'photos':
        return <Text style={styles.emptyText}>No photos to display yet</Text>;
      case 'videos':
        return <Text style={styles.emptyText}>No videos to display yet</Text>;
      case 'connections':
        return <Text style={styles.emptyText}>No connections to display yet</Text>;
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.headerBanner} />
          <Image
            source={{ uri: user.profilePictureUrl || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.fullName || user.username}</Text>
          <Text style={styles.profession}>{user.profession || 'Film Professional'}</Text>

          <View style={styles.metaRow}>
            <MaterialIcons name="location-pin" size={18} color="#fff" />
            <Text style={styles.metaText}>{user.location || 'Not specified'}</Text>
          </View>

          <View style={styles.metaRow}>
            <FontAwesome5 name="users" size={14} color="#fff" />
            <Text style={styles.metaText}>
              {user.connectionsCount || 0} connections
            </Text>
          </View>

          <View style={styles.metaRow}>
            <MaterialIcons name="event" size={16} color="#fff" />
            <Text style={styles.metaText}>Joined {user.joinedDate || 'N/A'}</Text>
          </View>

          <View style={styles.metaRow}>
            <MaterialIcons name="link" size={16} color="#fff" />
            <Text style={styles.metaText}>{user.availability || 'Not specified'}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.connectBtn}>
              <Text style={styles.btnText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageBtn}>
              <Text style={styles.btnText}>Message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              {user.bio ||
                'Tell others about your experience in the film industry.'}
            </Text>
          </View>

          {/* Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setSelectedTab('posts')}
              style={[styles.tabItem, selectedTab === 'posts' && styles.activeTab]}
            >
              <Icon
                name="message-text-outline"
                size={18}
                color={selectedTab === 'posts' ? '#2e7d32' : '#888'}
              />
              <Text
                style={[styles.tabText, selectedTab === 'posts' && styles.activeTabText]}
              >
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('photos')}
              style={[styles.tabItem, selectedTab === 'photos' && styles.activeTab]}
            >
              <Icon
                name="image-outline"
                size={18}
                color={selectedTab === 'photos' ? '#2e7d32' : '#888'}
              />
              <Text
                style={[styles.tabText, selectedTab === 'photos' && styles.activeTabText]}
              >
                Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('videos')}
              style={[styles.tabItem, selectedTab === 'videos' && styles.activeTab]}
            >
              <Icon
                name="video-outline"
                size={18}
                color={selectedTab === 'videos' ? '#2e7d32' : '#888'}
              />
              <Text
                style={[styles.tabText, selectedTab === 'videos' && styles.activeTabText]}
              >
                Videos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('connections')}
              style={[styles.tabItem, selectedTab === 'connections' && styles.activeTab]}
            >
              <Icon
                name="account-multiple-outline"
                size={18}
                color={selectedTab === 'connections' ? '#2e7d32' : '#888'}
              />
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'connections' && styles.activeTabText,
                ]}
              >
                Connections
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContent}>{renderTabContent()}</View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  headerBanner: {
    backgroundColor: '#ff7e5f',
    height: 100,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#fff',
  },
  profession: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  metaText: {
    marginLeft: 6,
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  connectBtn: {
    backgroundColor: '#ff7e5f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  messageBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  aboutText: {
    color: '#fff',
    lineHeight: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 6,
  },
  tabText: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#2e7d32',
  },
  activeTabText: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  tabContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
