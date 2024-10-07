import { SyntheticEvent, useContext, useEffect, useRef, useState } from 'react';
import { MdArrowCircleDown, MdArrowDropUp } from 'react-icons/md';

// import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
// import 'react-json-view-lite/dist/index.css';
// import { JsonEditor } from 'json-edit-react'


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
export interface PromptEditorProps {}

export const PromptEditor = () => {
  const mainContext = useContext(MainContext);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<{ id: number; mesg: string }[]>([]);
  const [promptTypes, setPromptTypes] = useState<PromptTypes>();

  useEffect(() => {
    if (!mainContext?.state) {
      return;
    }
  }, [mainContext]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeHandler = (e: SyntheticEvent) => {
  };


  return (
    <div className="flex flex-col h-full gap-y-4">
      {mainContext?.state.pageContent.page && 
      // <JsonEditor data={mainContext?.state.pageContent}  />
        <div>edit</div>
      }
      
    </div>
  );
};
