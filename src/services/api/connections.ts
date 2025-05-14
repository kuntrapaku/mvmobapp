// src/services/api/connections.ts

import axios from 'axios';
import { UserDTO, ConnectionRequestDTO } from '../../type';

const BASE_URL = 'http://10.0.2.2:8080/api';

export const getConnectionRequests = async (token: string | undefined): Promise<ConnectionRequestDTO[]> => {
  if (!token) throw new Error('Missing auth token');

  const res = await axios.get(`${BASE_URL}/connections/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("API Response - Connection Requests:", res.data);

  // Return as ConnectionRequestDTO[]
  return res.data;
};

export const getConnections = async (token: string | undefined): Promise<UserDTO[]> => {
  if (!token) throw new Error('Missing auth token');

  const res = await axios.get(`${BASE_URL}/connections`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("API Response - Connections:", res.data);

  return res.data;
};

export const acceptRequest = async (requestId: number, token: string | undefined): Promise<void> => {
  if (!token) throw new Error('Missing auth token');

  await axios.post(`${BASE_URL}/connections/accept/${requestId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const ignoreRequest = async (requestId: number, token: string | undefined): Promise<void> => {
  if (!token) throw new Error('Missing auth token');

  await axios.post(`${BASE_URL}/connections/ignore`, null, {
    headers: { Authorization: `Bearer ${token}` },
    params: { requestId },
  });
};
