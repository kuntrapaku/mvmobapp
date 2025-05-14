import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  role: string;
}

interface ConnectionsState {
  pending: User[];
  accepted: User[];
}

const initialState: ConnectionsState = {
  pending: [],
  accepted: [],
};

const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    setPendingConnections(state, action: PayloadAction<User[]>) {
      state.pending = action.payload;
    },
    acceptConnection(state, action: PayloadAction<string>) {
      const userId = action.payload;
      const user = state.pending.find((u) => u.id === userId);
      if (user) {
        state.pending = state.pending.filter((u) => u.id !== userId);
        state.accepted.push(user);
      }
    },
    declineConnection(state, action: PayloadAction<string>) {
      state.pending = state.pending.filter((u) => u.id !== action.payload);
    },
    // NEW: Clear all connections
    clearConnections(state) {
      state.pending = [];
      state.accepted = [];
    },
  },
});

export const {
  setPendingConnections,
  acceptConnection,
  declineConnection,
  clearConnections,
} = connectionsSlice.actions;

export default connectionsSlice.reducer;
