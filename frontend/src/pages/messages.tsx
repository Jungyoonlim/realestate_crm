import { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  sender: number;
  receiver: number;
  content: string;
  timestamp: string;
}

export default function Messaging() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiver, setReceiver] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages/my_messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiver) return;

    try {
      await axios.post('/api/messages/', {
        receiver,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Messaging</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="number"
          value={receiver || ''}
          onChange={(e) => setReceiver(parseInt(e.target.value))}
          placeholder="Receiver ID"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}