import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowCircleDown, MdArrowDropUp } from 'react-icons/md';

import { DctButton, DctAccordion, DctItemHeading, DctItem } from '@dctjs/react';

import { Circle } from '@/shared-ui';

import { MainActions, MainContext } from '../../main.provider';
import { FetchState, PageBuilderBaseComponentType } from '@/shared-data';
import { InputConfirmation } from '../input-confirmation/input-confirmation';

const DEFAULT_TEXTAREA_HEIGHT = '40px';

interface PromptTypes {
  error?: string;
  attributes: string[];
  classifications: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PromptFormProps {}

export const PromptForm = () => {
  const mainContext = useContext(MainContext);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<{ id: number; mesg: string }[]>([]);
  const [promptTypes, setPromptTypes] = useState<PromptTypes>();

  useEffect(() => {
    console.log('XXX FORM STATE', mainContext?.state);
    if (!mainContext?.state) {
      return;
    }
    if (
      mainContext.state.pageStatus.state === FetchState.ERROR &&
      mainContext.state.pageStatus.errorStatusText
    ) {
      setPromptTypes({
        attributes: [],
        classifications: [],
        error: `${mainContext.state.pageStatus.errorStatusText} code: ${mainContext.state.pageStatus.errorStatusCode} `,
      });
      return;
    }

    if (mainContext?.state.pageContent?.prompts) {
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
          } else if (
            parts[0] === 'intent-classification' ||
            parts[0] === 'invalid-component'
          ) {
            a.classifications.push(parts[1]);
          }

          return a;
        },
        {
          attributes: [],
          classifications: [],
          error: undefined,
        }
      );

      setPromptTypes(prompts);
    }
  }, [mainContext]);

  const handleClick = (event: Event) => {
    if (!userPrompt.trim()) {
      return;
    }

    setMessages((prevMessages) => [
      { id: Date.now(), mesg: userPrompt },
      ...prevMessages,
    ]);

    setUserPrompt('');
    mainContext?.dispatch({
      type: MainActions.USER_PROMPT,
      payload: { timestamp: Date.now(), prompt: userPrompt },
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
    setUserPrompt(target.value);
    textRef.current.style.minHeight = DEFAULT_TEXTAREA_HEIGHT;
    textRef.current.style.minHeight = `${target.scrollHeight}px`;
  };

  const classifications = () => {
    return promptTypes?.classifications.map((cls) => {
      return (
        <DctAccordion
          key={cls}
          className="bg-blue-50 m-2 overflow-hidden rounded-lg"
        >
          <DctItemHeading slot="heading" animateIcons={true}>
            <span slot="start">
              <MdArrowDropUp size={24} />
            </span>
            <p slot="heading">Classification error</p>
            <p slot="sub-heading">{cls}</p>
          </DctItemHeading>
          <DctItem>
            <p>Unable to process request due to unknown component</p>
          </DctItem>
        </DctAccordion>
      );
    });
  };

  const confirmations = () => {
    const comps = promptTypes?.attributes.reduce(
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

    return comps
      ? comps.map((comp) => (
          <InputConfirmation key={comp.id} component={comp}></InputConfirmation>
        ))
      : [];
  };

  const apiError = () => {
    if (promptTypes?.error) {
      return (
        <DctAccordion className="bg-red-50 m-2 overflow-hidden rounded-lg">
          <DctItemHeading slot="heading" animateIcons={true}>
            <span slot="start">
              <MdArrowDropUp size={24} />
            </span>
            <p slot="heading">Processing error</p>
          </DctItemHeading>
          <DctItem>
            <p>Unable to process request due the following error</p>
            <p>{promptTypes?.error}</p>
          </DctItem>
        </DctAccordion>
      );
    }
  };

  return (
    <div className="flex flex-col h-full gap-y-4">
      <form className="flex gap-x-4 items-center" onSubmit={handleSubmit}>
        <textarea
          className="border cursor-text min-h-[40px] rounded-lg w-full p-2"
          placeholder="Let's build a page"
          onChange={onChangeHandler}
          ref={textRef}
          value={userPrompt}
        ></textarea>

        {mainContext?.state.pageStatus.state === FetchState.ACTIVE && (
          <Circle className="h-[32px] w-[32px] text-slate-700"></Circle>
        )}

        {mainContext?.state.pageStatus.state !== FetchState.ACTIVE && (
          <DctButton
            className="text-slate-700 w-[32px] h-[32px]"
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
        {apiError()}
        {classifications()}
        {confirmations()}
        {messages.map((msg, idx) => (
          <div key={`user-${msg.id}`} className="w-full pt-4 ">
            <div className={`${idx > 0 ? 'border-t' : ''} m-auto w-11/12`}></div>
            <div className="px-4 pt-4">{msg.mesg}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
