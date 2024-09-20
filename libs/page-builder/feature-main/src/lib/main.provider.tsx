import {
  createContext,
  Dispatch,
  RefObject,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {
  PageBuilderRequestType,
  fetchPageBuilder,
  FetchState,
  FetchResponse,
  PageBuilderSectionsType,
  PageBuilderBaseComponentType,
  PageBuilderComponentEnum,
} from '@/shared-data';
import { usePostMessage } from '@/shared-ui';

export enum MainActions {
  PAGE_CONTENT,
  PAGE_STATUS,
  USER_PROMPT,
  UPDATE_CONTENT,
  SIDEBAR_LEFT,
  SIDEBAR_RIGHT,
}

interface MainAction {
  type: MainActions;
  payload: undefined | unknown;
}

interface MainState {
  pageContent: PageBuilderRequestType;
  pageStatus: FetchResponse;
  sidebarState: { left: boolean; right: boolean };
  userPrompt: string | undefined;
}

const initialState: MainState = {
  pageContent: {
    page: {
      componentType: PageBuilderComponentEnum.PAGE_CONTAINER,
      id: 'default',
      sections: [],
      title: undefined,
    },
    prompts: [],
  },
  pageStatus: { state: FetchState.IDLE },
  sidebarState: { left: true, right: false },
  userPrompt: undefined,
};

const updateComponent = (
  comp: PageBuilderBaseComponentType,
  findId: string,
  obj: PageBuilderBaseComponentType
) => {
  if (comp.id === findId) {
    comp = { ...obj };

    return true;
  }

  return Object.entries(comp).some(([_key, val]) => {
    if (Array.isArray(val)) {
      const idx = val.findIndex((x) => x.id === findId);
      if (idx > -1) {
        val[idx] = { ...obj };
      }
      return true;
    }

    return false;
  });
};

const updateSections = (
  sections: PageBuilderSectionsType[],
  findId: string,
  obj: PageBuilderBaseComponentType | PageBuilderSectionsType
) => {
  return sections.some((section) => {
    if (section.id === findId) {
      section = obj as PageBuilderSectionsType;
      return false;
    }
    const comps = section.components.slice();
    return comps.some((comp) => {
      const updated = updateComponent(comp, findId, obj);
      if (updated) {
        section.components = comps;
      }
      return updated;
    });
  });
};

const useMainReducer = (state: MainState, action: MainAction) => {
  switch (action.type) {
    case MainActions.PAGE_CONTENT:
      return {
        ...state,
        pageContent: { ...(action.payload as PageBuilderRequestType) },
      };

    case MainActions.UPDATE_CONTENT:
      if (state.pageContent?.page?.sections) {
        const sections = state.pageContent?.page?.sections.slice();
        const upd = updateSections(
          sections,
          (action.payload as any).id,
          action.payload as any
        );
        if (upd) {
          const xxx = {
            ...state,
            pageContent: {
              ...state.pageContent,
              page: {
                ...state.pageContent.page,
                sections: sections,
              },
            },
          };
          console.log('XXX upd', upd, xxx);
          return xxx;
        }
      }

      return state;

    case MainActions.PAGE_STATUS:
      return {
        ...state,
        pageStatus: action.payload as FetchResponse,
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

export const InitializeMainContext = () => {
  const [state, dispatch] = useReducer(useMainReducer, initialState);

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
  // const [pageData, requestState, setUserPrompt] = usePageBuilderFetch();
  const { sendMessage } = usePostMessage('*', undefined, iframeRef);

  const p =
    'Create a section with a Carousel, the title of the Carousel is "Image gallery of Colorado State Parks"\n. Add a Card with the image url "/images/default-image.png". Add an Card with the title "card-2". Add a MyCompt with the title "hello". Create a section with the title "section-2" add a card with the title "section 2 card"';

  useEffect(() => {
    if (!ctx.state.userPrompt) {
      return;
    }

    ctx.dispatch({
      type: MainActions.PAGE_STATUS,
      payload: FetchState.ACTIVE,
    });

    (async () => {
      try {
        const response = await fetchPageBuilder(p, ctx.state.pageContent);
        ctx.dispatch({
          type: MainActions.PAGE_STATUS,
          payload: FetchState.ACTIVE,
        });
        ctx.dispatch({
          type: MainActions.PAGE_CONTENT,
          payload: response,
        });
      } catch (error) {
        ctx.dispatch({
          type: MainActions.PAGE_STATUS,
          payload: FetchState.ERROR,
        });
      }
    })();
  }, [ctx, ctx.state.userPrompt]);

  // useEffect(() => {
  //   if (requestState.state !== FetchState.IDLE) {
  //     return;
  //   }

  //   ctx.dispatch({
  //     type: MainActions.PAGE_CONTENT,
  //     payload: pageData,
  //   });
  // }, [pageData, requestState]);

  useEffect(() => {
    if (ctx.state.pageContent?.page) {
      sendMessage('page-builder', ctx.state.pageContent?.page);
    }
  }, [ctx.state.pageContent?.page, sendMessage]);

  // useEffect(() => {
  //   ctx.dispatch({
  //     type: MainActions.PAGE_STATUS,
  //     payload: requestState,
  //   });
  // }, [requestState]);

  return <MainContext.Provider value={ctx}>{children}</MainContext.Provider>;
};
