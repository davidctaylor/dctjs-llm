import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowCircleDown, MdArrowCircleUp } from 'react-icons/md';

import { DctButton, DctAccordian, DctItemHeading, DctItem } from '@dctjs/react';

import { Circle } from '@/shared-ui';

import { MainActions, MainContext } from '../../main.provider';
import { Message } from './message-utils';
import { PageBuilderMessage } from './interfaces';
import {
  FetchState,
  PageBuilderBaseComponentType,
  PageBuilderCarouseComponentType,
  PageBuilderComponentSectionEnum,
} from '@/shared-data';
import { InputConfirmation } from '../input-confirmation/input-confirmation';

const DEFAULT_TEXTAREA_HEIGHT = '40px';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageBuilderFormProps {}

export const PageBuilderForm = () => {
  const mainContext = useContext(MainContext);
  const [userInput, setUserInput] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<PageBuilderMessage[]>([]);
  const [confirmations, setConfirmations] = useState<
    PageBuilderBaseComponentType[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  useEffect(() => {
    console.log('XXX FORM STATE', mainContext?.state);
    if (!mainContext?.state) {
      return;
    }
    if (
      mainContext.state.pageStatus.state === FetchState.ERROR &&
      mainContext.state.pageStatus.errorStatusText
    ) {
      const temp: PageBuilderMessage[] = [
        {
          role: 'error',
          text: `Processing error: ${mainContext.state.pageStatus.errorStatusCode} ${mainContext.state.pageStatus.errorStatusText}`,
        },
      ];
      setMessages((prevMessages) => [...prevMessages, ...temp]);
      return;
    }

    if (mainContext?.state.pageContent?.prompts) {
      console.log('XXX PROMPTS:', mainContext?.state.pageContent?.prompts);
      const comps: PageBuilderBaseComponentType[] =
        mainContext.state.pageContent.prompts.reduce((a: any[], prompt: string | undefined) => {
          if (!prompt) {
            return a;
          }

          const parts = prompt.split(':');
          console.log('XXX PARYS:', parts);
          if (parts[0] !== 'missing-attributes') {
            return a;
          }
          const compId = parts[1];
          mainContext.state.pageContent?.page?.sections?.forEach((section) => {
            section.components.forEach((comp) => {
              if (comp.id === compId) {
                comp && a.push(comp);
              } else if ('cards' in comp) {
                const card = comp['cards'].find((card) => card.id === compId);
                card && a.push(card);
              }
            })
          });
          return a;
        }, []);

      setConfirmations(comps);

      const temp: PageBuilderMessage[] =
        mainContext.state.pageContent.prompts.map((msg) => ({
          role: 'assistant',
          text: msg,
        }));
      console.log('XXX temp', temp);
      setMessages((prevMessages) => [...prevMessages, ...temp]);
    }
  }, [mainContext]);

  const handleClick = (event: Event) => {
    console.log('XXX SUB', userInput.trim());
    if (!userInput.trim()) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', text: userInput },
    ]);
    setUserInput('');
    mainContext?.dispatch({
      type: MainActions.USER_PROMPT,
      payload: userInput,
    });
    textRef.current &&
      (textRef.current.style.minHeight = DEFAULT_TEXTAREA_HEIGHT);
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
    textRef.current.style.minHeight = DEFAULT_TEXTAREA_HEIGHT;
    textRef.current.style.minHeight = `${target.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col h-full gap-y-4">
      <form className="flex gap-x-4 items-center" onSubmit={handleSubmit}>
        <textarea
          className="border cursor-text min-h-[40px] rounded-lg w-full p-2"
          placeholder="Let's build a page"
          onChange={onChangeHandler}
          ref={textRef}
          value={userInput}
        ></textarea>

        {mainContext?.state.pageStatus.state === FetchState.ACTIVE && (
          <Circle className="h-[32px] w-[32px] text-slate-700"></Circle>
        )}

        {mainContext?.state.pageStatus.state !== FetchState.ACTIVE && (
          <DctButton
            className="overflow-hidden text-slate-700 [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
            ripple={false}
            button-style="text"
            buttonType="submit"
            iconButton={true}
            onDctButtonClick={handleClick}
          >
            <MdArrowCircleDown size={40} />
          </DctButton>
        )}
      </form>
      <div className="overflow-y-scroll h-full max-h-[calc(100vh-265px)] border rounded-lg">
        {confirmations &&
          confirmations.map((comp) => {
            return <InputConfirmation key={comp.id} component={comp}></InputConfirmation>;
          })}

        <div className="">
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
