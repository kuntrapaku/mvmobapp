import axios from 'axios';
import { UserDTO } from '../../types';

const BASE_URL = 'http://10.0.2.2:8080/api';

export const getConnectionRequests = async (token: string | undefined): Promise<UserDTO[]> => {
  const res = await axios.get(`${BASE_URL}/connections/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getConnections = async (token: string | undefined): Promise<UserDTO[]> => {
  const res = await axios.get(`${BASE_URL}/connections`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const acceptRequest = async (requestId: number, token: string | undefined) => {
  await axios.post(`${BASE_URL}/connections/accept/${requestId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const ignoreRequest = async (requestId: number, token: string | undefined) => {
  await axios.post(`${BASE_URL}/connections/ignore`, null, {
    headers: { Authorization: `Bearer ${token}` },
    params: { requestId },
  });
};
