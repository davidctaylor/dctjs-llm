'use client';

import { useEffect, useState } from 'react';

import { ApiState } from '../interfaces';
import { PageBuilderPromptType } from './page-builder-schema';

export const usePageBuilderFetch = () => {
  const [apiState, setApiState] = useState<ApiState>(ApiState.IDLE);
  const [pageData, setPageData] = useState<PageBuilderPromptType >();
  const [userPrompt, setUserPrompt] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!userPrompt) {
        return;
      }

      setPageData({
        "prompts": {
            "questions": [
                "Please provide a heading for the page.",
                "Would you like to add any sections to your page? If so, how many?"
            ]
        },
        "page": {
            "page": {
                "id": "page-1",
                "title": "hello world",
                "url": "hello-world"
            }
        },
        // "_meta": {
        //     "usage": {
        //         "prompt_tokens": 468,
        //         "completion_tokens": 54,
        //         "total_tokens": 522
        //     }
        // }
    });
      
      // setApiState(ApiState.ACTIVE);
      // try {
      //   const response = await fetch(`/api/page-builder`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       content: userPrompt,
      //     }),
      //   });
      //   console.log('XXX GOT1', response);
      //   // setPageData(await response.json());

      //   const x = await response.json();

      //   console.log('XXX GOT', x);

      //   setApiState(ApiState.IDLE);
      // } catch (error) {
      //   setApiState(ApiState.ERROR);
      // }
    })();
  }, [userPrompt]);

  return [pageData, apiState, setUserPrompt] as const;
};
