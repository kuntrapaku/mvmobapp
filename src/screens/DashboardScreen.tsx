// src/screens/DashboardScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import ConnectionsScreen from './ConnectionsScreen';
import MessagesScreen from './MessagesScreen';
import NotificationsScreen from './NotificationsScreen';
import { AppDispatch } from '../store/store';
import { RootStackParamList } from '../navigation/types';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.navigate('Login');
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Feed',
        headerRight: () =>
          route.name === 'Feed' ? (
            <View style={{ flexDirection: 'row', gap: 20, marginRight: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <MaterialCommunityIcons name="magnify" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          ) : null,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          switch (route.name) {
            case 'Feed':
              iconName = 'home';
              break;
            case 'Connections':
              iconName = 'account-multiple';
              break;
            case 'Messages':
              iconName = 'message-text';
              break;
            case 'Notifications':
              iconName = 'bell';
              break;
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff5858',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Connections" component={ConnectionsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}
