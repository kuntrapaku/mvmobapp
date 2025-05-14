// src/types/index.ts

export type UserDTO = {
  availability: string;
  joinedDate: string;
  connectionsCount: number;
  profession: string;
  id: number;
  username: string;
  fullName: string;
  profilePictureUrl?: string;
  bio?: string;
  location?: string;
  requestId?: number; // ✅ Add this line
};
