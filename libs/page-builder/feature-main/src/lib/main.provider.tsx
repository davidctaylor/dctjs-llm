import {
  createContext,
  Dispatch,
  RefObject,
  useEffect,
  useMemo,
  useReducer,
  useRef,
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

export interface UserPromptType {
  timestamp: number;
  prompt: string;
}

interface MainState {
  pageContent: PageBuilderRequestType;
  pageStatus: FetchResponse;
  sidebarState: { left: boolean; right: boolean };
  userPrompt: UserPromptType | undefined;
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
  // pageContent: {
  //   "page": {
  //       "componentType": "PAGE_CONTAINER",
  //       "id": "default",
  //       "sections": [
  //           {
  //               "componentType": "PAGE_SECTION",
  //               "components": [
  //                   {
  //                       "id": "section-0-carousel-1",
  //                       "componentType": "CAROUSEL",
  //                       "cards": [
  //                           {
  //                               "id": "section-0-carousel-1-card-1",
  //                               "componentType": "CARD",
  //                               "imageRef": "/images/default-image.png"
  //                           },
  //                           {
  //                               "id": "section-0-carousel-1-card-2",
  //                               "componentType": "CARD",
  //                               "title": "card-2"
  //                           }
  //                       ],
  //                       "title": "Image gallery of Colorado State Parks"
  //                   }
  //               ],
  //               "id": "section-0"
  //           },
  //           {
  //               "componentType": "PAGE_SECTION",
  //               "components": [
  //                   {
  //                       "id": "section-1-card-1",
  //                       "componentType": "CARD",
  //                       "title": "Display card",
  //                       "content": "card content card content card content",
  //                       "subTitle": "sub title display card",
  //                   }
  //               ],
  //               "heading": "Display cards",
  //               "id": "section-1"
  //           },
  //           {
  //               "componentType": "PAGE_SECTION",
  //               "components": [
  //                   {
  //                       "id": "section-2-accordion-1",
  //                       "componentType": "ACCORDION",
  //                       "heading": "What are the opening hours for Mesa Verde State Park?",
  //                       "content": "Mesa Verde State Park is generally open year-round; however, hours differ seasonally."
  //                   },
  //                   {
  //                       "id": "section-2-accordion-2",
  //                       "componentType": "ACCORDION",
  //                       "heading": "Are guided tours available at Mesa Verde?",
  //                       "content": "Yes, ranger-led tours are available and are a great way to explore archaeological sites."
  //                   },
  //                   {
  //                       "id": "section-2-accordion-3",
  //                       "componentType": "ACCORDION",
  //                       "heading": "What is the best time of year to visit Mesa Verde?",
  //                       "content": "Spring and fall offer pleasant weather and fewer crowds."
  //                   },
  //                   {
  //                       "id": "section-2-link-1",
  //                       "componentType": "LINK",
  //                       "content": "",
  //                       "href": "http://123.com",
  //                       "label": "click me!"
  //                   }
  //               ],
  //               "heading": "Frequently asked questions",
  //               "id": "section-2"
  //           }
  //       ]
  //   },
  //   "prompts": []
  // },

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (action.payload as any).id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          action.payload as any
        );
        if (upd) {
          return {
            ...state,
            pageContent: {
              ...state.pageContent,
              page: {
                ...state.pageContent.page,
                sections: sections,
              },
            },
          };
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
        userPrompt: action.payload as UserPromptType,
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
  const userPromptRef = useRef<UserPromptType>();

  // As an expert on Colorado state create two questions and and answers for visitors to the parks. Add a Accordion
  // for reach

  //Add a Accordion with the heading "What is the weather like" and the content "XX Freezing cold"

  let p = `
  As expert on Colorado state parks, create an article of no more that 500 words with a paragrap for each of the parks 'Mesa Verde', 'Great Sand Dunes' 
    and the 'Rocky Mountain National Park' with the title 'Colorful Colorado State parks'. Style your response using Markdown
  `;
  p = `
  Create a section with a Carousel, the title of the Carousel is "Image gallery of Colorado State Parks"\n. Add a Card with the image url 
    "/images/default-image.png". Add an Card with the title "card-2". Create a section with the title "Display cards" add a card with the title "Display card"
  `;

  p = `
  Create a new section with the heading "Frequently asked questions".
  As an expert on Colorado state parks generate three common questions and answers for visitors to the Mesa Verde state park. 
  Use these to create Acccordions with the question in the acccordion 'heading' and the answer in acccordion content'
  Add a CTA with the label "click me!" and the href "http://123.com"
`;

  useEffect(() => {
    if (!ctx.state.userPrompt) {
      return;
    }

    if (
      userPromptRef.current &&
      userPromptRef.current.timestamp === ctx.state.userPrompt.timestamp
    ) {
      return;
    }

    userPromptRef.current = ctx.state.userPrompt;

    ctx.dispatch({
      type: MainActions.PAGE_STATUS,
      payload: { state: FetchState.ACTIVE },
    });

    (async () => {
      try {
        const response = await fetchPageBuilder(
          ctx.state.userPrompt?.prompt as string,
          ctx.state.pageContent
        );
        ctx.dispatch({
          type: MainActions.PAGE_STATUS,
          payload: { state: FetchState.IDLE },
        });
        ctx.dispatch({
          type: MainActions.PAGE_CONTENT,
          payload: response,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('XXX error', error);
        ctx.dispatch({
          type: MainActions.PAGE_STATUS,
          payload: {
            state: FetchState.ERROR,
            errorStatusCode: error.status,
            errorStatusText: error.message,
          },
        });
      }
    })();
  }, [ctx, ctx.state.userPrompt]);

  useEffect(() => {
    if (ctx.state.pageContent?.page) {
      sendMessage('page-builder', ctx.state.pageContent?.page);
    }
  }, [ctx.state.pageContent?.page]);

  return <MainContext.Provider value={ctx}>{children}</MainContext.Provider>;
};
