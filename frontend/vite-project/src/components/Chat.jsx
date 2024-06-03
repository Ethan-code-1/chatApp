import React, { useState } from 'react';
import '../Styles/Chat.css';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([
    
    { text: 'Hi there!', isSender: false },
    { text: 'Hello! How are you?', isSender: true },
    { text: 'I\'m good, thanks! And you?', isSender: false },
    { text: 'Doing great, thanks!', isSender: true },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, isSender: true };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setNewMessage('');

      const formattedMessages = updatedMessages.map(msg => ({
        role: msg.isSender ? 'user' : 'assistant',
        content: msg.text
      }));

      try {
        const response = await axios.post('http://localhost:5002/api/chat', { messages: formattedMessages });
        const botMessage = { text: response.data.reply, isSender: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="yourChatHeader">Your Chat</h1>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.isSender ? 'right' : 'left'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="text-field-container">
        <input
          type="text"
          className="rounded-text-field"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
