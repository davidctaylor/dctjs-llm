'use client';

import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';
import { DctButton } from '@dctjs/react';

import { usePageBuilderFetch, PageBuilderPromptType } from '@/shared-data';

import { MainActions, MainContext } from '../../main.provider';
import { Message } from './message-utils';
import { PageBuilderMessage } from './interfaces';
import { usePostMessage } from '@/shared-ui';

const COLOR_ENABLED = 'rgb(31 41 55)';
const COLOR_DISABLED = 'rgb(209 213 219)';

export interface PageBuilderFormProps {}

export const PageBuilderForm = (props: PageBuilderFormProps) => {
  const mainContext = useContext(MainContext);
  const [pageData, requestState, setUserPrompt] = usePageBuilderFetch();
  const [userInput, setUserInput] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<PageBuilderMessage[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState('');
  // const { sendMessage } = usePostMessage('*', undefined, iframeRef);

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (pageData?.prompts) {
      const temp: PageBuilderMessage[] = pageData.prompts.questions.map(
        (msg) => ({ role: 'assistant', text: msg })
      );
      setMessages((prevMessages) => [...prevMessages, ...temp]);
    }

    mainContext?.dispatch({ type: MainActions.PAGE_CONTENT, payload: pageData?.page });
    // sendMessage('page-builder', pageData?.page);
  }, [pageData]);

  const handleClick = (event: Event) => {
    console.log('XXX SUB', userInput.trim());
    // if (!userInput.trim()) {
    //   return;
    // }

    const x = 'create a web page with the title "hello world"';
    // setUserPrompt(x);
    mainContext?.dispatch({ type: MainActions.USER_PROMPT, payload: x});
    // sendMessage(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', text: 'create a web page with the title "hello world"' },
    ]);
    setUserInput('');
    setInputDisabled(true);
    scrollToBottom();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (!textRef.current) {
      return;
    }
    setUserInput(target.value);
    textRef.current.style.height = '40px';
    textRef.current.style.height = `${target.scrollHeight}px`;
  };
  return (
    <div className="flex flex-col h-full gap-y-4">
      <div className="overflow-y-scroll max-h-[calc(100vh-265px)] border rounded-lg">
        <div className="min-h-[1000px]">
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form className="flex gap-x-4" onSubmit={handleSubmit}>
        <textarea
          className="border cursor-text min-h-[40px] rounded-lg w-full p-2"
          placeholder="Let's build a page"
          onChange={onChangeHandler}
          ref={textRef}
          value={userInput}
        ></textarea>
        <DctButton
          className="overflow-hidden [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
          ripple={false}
          button-style="text"
          buttonType="submit"
          iconButton={true}
          onDctButtonClick={handleClick}
        >
          <MdArrowCircleUp size={32} color={COLOR_ENABLED} />
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
