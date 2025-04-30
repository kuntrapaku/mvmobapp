import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { RootState } from '../store/store';
import socket from '../services/socket';

type ChatRouteParams = {
  recipientId: number;
  recipientName: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const route = useRoute();

  // ✅ Type-safe route params
  const { recipientId, recipientName } = route.params as ChatRouteParams;

  useEffect(() => {
    if (!recipientId || !user?.id) return;

    socket.connect();

    socket.on('receive_message', (message: IMessage) => {
      if (message.user._id === recipientId) {
        setMessages((prev) => GiftedChat.append(prev, [message]));
      }
    });

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [recipientId, user?.id]);

  const onSend = useCallback((msgs: IMessage[] = []) => {
    const msg = msgs[0];
    const enriched = {
      ...msg,
      to: recipientId,
      from: user?.id,
    };
    socket.emit('send_message', enriched);
    setMessages((prev) => GiftedChat.append(prev, [msg]));
  }, [recipientId, user?.id]);

  if (!user?.id || !recipientId) return null; // ✅ Fallback safety

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{ _id: user.id }}
    />
  );
}
