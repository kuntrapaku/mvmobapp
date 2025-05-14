// src/types.ts

export type UserDTO = {
  id: number;
  username: string;
  fullName?: string;
  profilePictureUrl?: string;
  bio?: string;
  location?: string;
  connectionsCount?: number;
  joinedDate?: string;
  availability?: string;
  profession?: string;
};

export type ConnectionRequestDTO = {
  requestId: number;    // ConnectionRequest ID
  senderId: number;      // Sender User ID
  senderUsername: string;
  senderFullName?: string;
  senderProfilePictureUrl?: string;
};
