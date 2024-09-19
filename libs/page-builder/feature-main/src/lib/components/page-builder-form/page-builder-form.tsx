import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import {
  MdArrowCircleDown,
  MdArrowCircleUp,
  MdArrowDropUp,
} from 'react-icons/md';

import { DctButton, DctAccordion, DctItemHeading, DctItem } from '@dctjs/react';

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

interface PromptTypes {
  attributes: string[];
  classifications: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageBuilderFormProps {}

export const PageBuilderForm = () => {
  const mainContext = useContext(MainContext);
  const [userInput, setUserInput] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<PageBuilderMessage[]>([]);
  const [promptTypes, setPromptTypes] = useState<PromptTypes>();
  // const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

      const prompts: PromptTypes = mainContext.state.pageContent.prompts.reduce(
        (a: PromptTypes, prompt: string | undefined) => {
          if (!prompt) {
            return a;
          }

          const parts: string[] = prompt.split(':');
          if (!parts[1]) {
            return a;
          }
          if (parts[0] === 'missing-attributes') {
            a.attributes.push(parts[1]);
          } else if (parts[0] === 'intent-classification') {
            a.classifications.push(parts[1]);
          }

          return a;
        },
        {
          attributes: [],
          classifications: [],
        }
      );

      setPromptTypes(prompts);
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

  const classifications = () => {
    return promptTypes?.classifications.map((cls) => {
      return (
        <DctAccordion className="bg-blue-50 m-2 overflow-hidden rounded-lg">
          <DctItemHeading slot="heading" animateIcons={true}>
            <span slot="start">
              <MdArrowDropUp size={24} />
            </span>
            <p slot="heading">Classify</p>
            <p slot="sub-heading">{cls}</p>
          </DctItemHeading>
          <DctItem className="pl-0">
            <p>Unable to process request due to unknown component</p>
          </DctItem>
        </DctAccordion>
      );
    });
  };
  const confirmations = () => {
    if (!promptTypes?.attributes) {
      return [];
    }
    const comps = promptTypes.attributes.reduce(
      (a: PageBuilderBaseComponentType[], compId) => {
        mainContext?.state.pageContent?.page?.sections?.forEach((section) => {
          section.components.forEach((comp) => {
            if (comp.id === compId) {
              comp && a.push(comp);
            } else if ('cards' in comp) {
              const card = comp['cards'].find((card) => card.id === compId);
              card && a.push(card);
            }
          });
        });
        return a;
      },
      []
    );

    return comps.map((comp) => (
      <InputConfirmation key={comp.id} component={comp}></InputConfirmation>
    ));
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
            <MdArrowCircleDown size={32} />
          </DctButton>
        )}
      </form>
      <div className="overflow-y-scroll h-full max-h-[calc(100vh-265px)] border rounded-lg">
        {classifications()}
        {confirmations()}

        <div className="">
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} text={msg.text} />
          ))}
        </div>
      </div>
    </div>
  );
};
