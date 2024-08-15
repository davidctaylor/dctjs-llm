
import { useEffect, useState } from 'react';
import { ApiState } from '../../interfaces';

import { baseFetch } from './base-fetch';

export const useBaseFetch = (url: string, options: RequestInit) => {
  const [apiState, setApiState] = useState<ApiState>(ApiState.IDLE);
  const [apiData, setApiData] = useState<unknown>();

  useEffect(() => {
    (async () => {
      setApiState(ApiState.ACTIVE);
      try {
        // const response = await fetch(url, options);
        const data = await baseFetch(url, options);

        // const response = await Promise.resolve({ok: true,
        //   json: () => MOCK,
        // });

        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
        setApiData(data);
        setApiState(ApiState.IDLE);
      } catch (error) {
        setApiState(ApiState.ERROR);
      }
    })();
  }, [url, options]);

  return [apiData, apiState];
};
