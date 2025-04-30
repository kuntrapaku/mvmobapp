export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Dashboard: undefined;
  CreateFrame: undefined;
  Feed: undefined;
  Connections: undefined;
  Messages: undefined;
  Notifications: undefined;
  Chat: { recipientId: number; recipientName: string };
  Search: undefined;
  UserProfile: { user: { id: number; username: string; fullName: string; profilePictureUrl?: string; bio?: string; location?: string } };
  Profile: { userId: number };

};
