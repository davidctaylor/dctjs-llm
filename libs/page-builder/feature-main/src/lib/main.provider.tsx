import {
  createContext,
  Dispatch,
  RefObject,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { PageBuilderPromptType, usePageBuilderFetch } from '@/shared-data';
import { usePostMessage } from '@/shared-ui';

export type TitlesRefreshType = 'active' | 'disabled' | 'pending';

export enum MainActions {
  PAGE_CONTENT,
  USER_PROMPT,
  SIDEBAR_LEFT,
  SIDEBAR_RIGHT,
}

interface MainAction {
  type: MainActions;
  payload: undefined | unknown;
}

interface MainState {
  pageContent: PageBuilderPromptType | undefined;
  sidebarState: { left: boolean; right: boolean };
  userPrompt: string | undefined;
}

const initialState: MainState = {
  pageContent: undefined,
  sidebarState: { left: true, right: false },
  userPrompt: undefined,
};

const mainReducer = (state: MainState, action: MainAction) => {
  switch (action.type) {
    case MainActions.PAGE_CONTENT:
      return {
        ...state,
        pageContent: { ...(action.payload as PageBuilderPromptType) },
      };

    case MainActions.USER_PROMPT:
      return {
        ...state,
        userPrompt: action.payload as string,
      };

    case MainActions.SIDEBAR_LEFT:
      return {
        ...state,
        sidebarState: {
          left: !state.sidebarState.left,
          right: state.sidebarState.right,
        },
      };

    case MainActions.SIDEBAR_RIGHT:
      return {
        ...state,
        sidebarState: {
          left: state.sidebarState.left,
          right: !state.sidebarState.right,
        },
      };

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const initializeMainContext = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return contextValue;
};

export const MainContext = createContext<{
  state: MainState;
  dispatch: Dispatch<MainAction>;
} | null>(null);

export const MainProvider = ({
  ctx,
  children,
  iframeRef,
}: {
  ctx: {
    state: MainState;
    dispatch: Dispatch<MainAction>;
  };
  children: React.ReactNode;
  iframeRef?: RefObject<HTMLIFrameElement | null>;
}) => {
  const [pageData, requestState, setUserPrompt] = usePageBuilderFetch();
  const { sendMessage } = usePostMessage('*', undefined, iframeRef);

  useEffect(() => {
    if (!ctx.state.userPrompt) {
      return;
    }
    setUserPrompt(ctx.state.userPrompt);
  }, [ctx.state.userPrompt]);

  useEffect(() => {
    if (pageData?.pageContent) {
      sendMessage('page-builder', pageData?.pageContent);
    }

    ctx.dispatch({
      type: MainActions.PAGE_CONTENT,
      payload: pageData,
    });
  }, [pageData]);

  return (
    <MainContext.Provider value={ctx}>
      {children}
    </MainContext.Provider>
  );
};
