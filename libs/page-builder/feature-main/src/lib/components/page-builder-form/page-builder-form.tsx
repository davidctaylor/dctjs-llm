import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowCircleUp } from 'react-icons/md';
import { DctButton } from '@dctjs/react';

import { Circle } from '@/shared-ui';

import { MainActions, MainContext } from '../../main.provider';
import { Message } from './message-utils';
import { PageBuilderMessage } from './interfaces';
import { ApiState } from '@/shared-data';

const DEFUALT_TEXTAREAD_HEIGHT = '40px';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageBuilderFormProps {};

export const PageBuilderForm = () => {
  const mainContext = useContext(MainContext);
  const [userInput, setUserInput] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<PageBuilderMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!mainContext?.state.pageContent?.prompts) {
      return;
    }
    if (mainContext?.state.userPrompt) {
      const temp: PageBuilderMessage[] =
        mainContext?.state.pageContent?.prompts.questions.map((msg) => ({
          role: 'assistant',
          text: msg,
        }));
      setMessages((prevMessages) => [...prevMessages, ...temp]);
    }
  }, [mainContext]);

  const handleClick = (event: Event) => {
    console.log('XXX SUB', userInput.trim());
    // if (!userInput.trim()) {
    //   return;
    // }

    const x =
      'create a web page article with the title "Colorado State Parks". As expert on Colorado State Parks, create an article describing the parks Mesa Verda and Great Sand Dunes the article should be no more that 500 words.';

    // const x = 'create a web page article with the title "Colorado State Parks"';
    // setUserPrompt(x);
    mainContext?.dispatch({ type: MainActions.USER_PROMPT, payload: x });
    // sendMessage(userInput);
    setMessages((prevMessages) => [...prevMessages, { role: 'user', text: x }]);
    setUserInput('');
    textRef.current && (textRef.current.style.height = DEFUALT_TEXTAREAD_HEIGHT);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeHandler = (e: SyntheticEvent) => {
    console.log('XXX change');
    const target = e.target as HTMLTextAreaElement;
    if (!textRef.current) {
      return;
    }
    setUserInput(target.value);
    textRef.current.style.height = DEFUALT_TEXTAREAD_HEIGHT;
    textRef.current.style.height = `${target.scrollHeight}px`;
  };
  
  return (
    <div className="flex flex-col h-full gap-y-4">
      <div className="overflow-y-scroll h-full max-h-[calc(100vh-265px)] border rounded-lg">
        <div className="">
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form className="flex gap-x-4 items-center" onSubmit={handleSubmit}>
        <textarea
          className="border cursor-text min-h-[40px] rounded-lg w-full p-2"
          placeholder="Let's build a page"
          onChange={onChangeHandler}
          ref={textRef}
          value={userInput}
        ></textarea>

        {mainContext?.state.pageStatus === ApiState.ACTIVE && (
          <Circle className="h-[32px] w-[32px] text-slate-700"></Circle>
        )}

        {mainContext?.state.pageStatus !== ApiState.ACTIVE && (
          <DctButton
            className="overflow-hidden text-slate-700 [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
            ripple={false}
            button-style="text"
            buttonType="submit"
            iconButton={true}
            onDctButtonClick={handleClick}
          >
            <MdArrowCircleUp size={40} />
          </DctButton>
        )}
      </form>
    </div>
  );
};
