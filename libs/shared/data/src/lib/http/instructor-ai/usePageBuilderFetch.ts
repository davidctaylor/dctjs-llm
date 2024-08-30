'use client';

import { useEffect, useState } from 'react';

import { ApiState } from '../interfaces';
import {
  PageBuilderComponentType,
  PageBuilderPromptType,
} from './page-builder-schema';

export const usePageBuilderFetch = () => {
  const [apiState, setApiState] = useState<ApiState>(ApiState.IDLE);
  const [pageData, setPageData] = useState<PageBuilderPromptType>();
  const [userPrompt, setUserPrompt] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!userPrompt) {
        return;
      }

      setApiState(ApiState.ACTIVE);

      setTimeout(() => {
        setApiState(ApiState.IDLE);
      }, 1000);

      const x = {
        "pageContent": {
            "page": {
                "pageContent": {
                    "content": "### Mesa Verde National Park\n\nMesa Verde National Park, located in southwestern Colorado, is a UNESCO World Heritage site famous for its well-preserved Ancestral Puebloan cliff dwellings, notably the Cliff Palace. Visitors can explore a range of impressive archaeological sites that give a glimpse into the lives of the Ancestral Puebloans who lived there from approximately A.D. 600 to 1300. The park offers guided tours, hiking trails, and educational exhibits at the visitor center, making it a fantastic destination for history buffs and outdoor enthusiasts alike.\n\n### Great Sand Dunes National Park and Preserve\n\nGreat Sand Dunes National Park and Preserve, located in southern Colorado, is home to the tallest sand dunes in North America, rising up to 750 feet. This unique landscape provides a stunning contrast with the surrounding mountains and grasslands. The park offers a wide range of activities including sandboarding, hiking, and stargazing. Visitors can also explore Medano Creek, which flows at the base of the dunes seasonally, creating a beach-like environment perfect for family fun. With its striking natural beauty and diverse recreational opportunities, Great Sand Dunes is a must-visit Colorado destination.\n\n",
                    "componentType": "content",
                    "id": "content-1"
                },
                "componentType": "page_container",
                "id": "page-1",
                "title": {
                    "title": "Colorado State Parks",
                    "subTitle": "Exploring the Beauty of Mesa Verde and Great Sand Dunes",
                    "id": "title-1"
                },
                "url": "colorado-state-parks"
            }
        },
        "_meta": {
            "usage": {
                "prompt_tokens": 644,
                "completion_tokens": 319,
                "total_tokens": 963
            }
        }
    }

    // setPageData(x);


      // console.log('XXX sub', userPrompt);
      setApiState(ApiState.ACTIVE);
      try {
        const response = await fetch(`/api/page-builderXXX`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: userPrompt,
          }),
        });
        console.log('XXX GOT1', response);
        if (response.status !== 200) {
          setApiState(ApiState.ERROR);
          return;
        }

        const x = await response.json();
        console.log('XXX GOT', x);

        setPageData(x);

        // setPageData(await response.json());

        setApiState(ApiState.IDLE);
      } catch (error) {
        console.log('XXX error...', error);
        setApiState(ApiState.ERROR);
      }
    })();
  }, [userPrompt]);

  return [pageData, apiState, setUserPrompt] as const;
};
