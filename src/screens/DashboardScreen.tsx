import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Instead of default import, try named:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedScreen from './FeedScreen';
import ConnectionsScreen from './ConnectionsScreen';
import MessagesScreen from './MessagesScreen'; // create dummy
import NotificationsScreen from './NotificationsScreen'; // create dummy

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
  console.log('MessagesScreen is:', typeof MessagesScreen);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';

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
