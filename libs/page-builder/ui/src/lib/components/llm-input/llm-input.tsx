'use client';

import { useState } from 'react';
import {
  DctButton,
  DctCard,
  DctCardContent,
  DctCardTitle,
  DctCarousel,
} from '@dctjs/react';

export const LlmInput = () => {
  const [userInput, setUserInput] = useState<string>('');

  const handleClick = (event: Event) => {
    console.log('XXX SUB', userInput.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('XXX SUB');
    if (!userInput.trim()) {
      return;
    }
    // sendMessage(userInput);
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { role: 'user', text: userInput },
    // ]);
    setUserInput('');
    // setInputDisabled(true);
    // scrollToBottom();
  };

  return (
    <div>
      {/* <div >
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div> */}
      <form
        onSubmit={handleSubmit}
        // className={`${styles.inputForm} ${styles.clearfix}`}
      >
        <input
          type="text"
          // className={styles.input}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your question"
        />
        <DctButton
          ripple={false}
          button-style="filled"
          buttonType="submit"
          onDctButtonClick={handleClick}
        >
          Send
        </DctButton>
        {/* <button
          type="submit"
          // className={styles.button}
          // disabled={inputDisabled}
        >
          Send
        </button> */}
      </form>
    </div>
  );
};
