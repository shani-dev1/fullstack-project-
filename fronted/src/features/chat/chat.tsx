import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const socket: Socket = io('http://localhost:3500');

  useEffect(() => {
    socket.on('receiveMessage', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, input]);
      socket.emit('sendMessage', input);
      setInput('');
    }
  };

  return (
    <div>
        <h1>ouer chat</h1>
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
