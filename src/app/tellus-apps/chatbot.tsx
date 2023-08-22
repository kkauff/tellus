import React, { useState, useRef, useEffect } from 'react';
import { converse } from '../../api/hfApi';
import styles from './chatbot.module.scss';
import { Button, Icon } from '@blueprintjs/core';

interface Message {
  text: string;
  type: string;
}

const Chatbot = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (messages.length > 0) {
      setUserInput(messages[messages.length - 1].text);
    }
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { value: input } = inputRef.current || {};

    if (!input) return;

    setLoading(true);
    setUserInput(input); // Store user input
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, type: 'user' },
    ]);

    const response = await converse(input);
    const botMessage: Message = { text: response.generated_text, type: 'bot' };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLoading(false);

    if (inputRef.current) {
      inputRef.current.value = ''; // Clear input after sending
    }
  };

  return (
    <div className={`container ${styles['chatbot-container']}`}>
      <div className={styles['chat-history']}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles['message']} ${
              message.type === 'user' ? styles['user'] : styles['bot']
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && (
          <div className={`${styles['message']} ${styles['bot']}`}>
            Loading...
          </div>
        )}
      </div>
      <form className={styles['chat-input']} onSubmit={handleSubmit}>
        <div className={styles['input-wrapper']}>
          <input
            type="text"
            name="input"
            ref={inputRef}
            className={styles['user-input']}
            placeholder="Type your message..."
          />
          <Button
            icon={<Icon icon="send-message" />}
            intent="primary"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
