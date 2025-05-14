import { UserDTO } from '../types';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  CreateFrame: undefined;
  Feed: undefined;
  Connections: undefined;
  Messages: undefined;
  Notifications: undefined;
  Chat: { recipientId: number; recipientName: string };
  Search: undefined;
  UserProfile: { user: UserDTO };
};
