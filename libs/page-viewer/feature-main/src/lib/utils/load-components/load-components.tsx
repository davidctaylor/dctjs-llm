import { lazy } from 'react';

import { PageBuilderComponentType, PageBuilderType } from '@/shared-data';

const COMPONENT_MAP: Record<PageBuilderComponentType, any> = {
  [PageBuilderComponentType.PAGE_CONTAINER]: lazy(() => import('../../components/page-container/page-container').then(
    ({ PageContainer }) => ({
      default: PageContainer,
    })
  )
  ),
  // [PageBuilderComponentType.PAGE_SECTIONS]: lazy(() =>
  //   import('../../components/section-container/section-container').then(
  //     ({ SectionContainer }) => ({
  //       default: SectionContainer,
  //     })
  //   )
  // ),
  [PageBuilderComponentType.PAGE_SECTION]: lazy(() => import('../../components/section-container/section-container').then(
    ({ SectionContainer }) => ({
      default: SectionContainer,
    })
  )
  ),
  [PageBuilderComponentType.ACCORDIAN]: undefined,
  [PageBuilderComponentType.BUTTON]: undefined,
  [PageBuilderComponentType.CARD]: lazy(() => import('../../components/card-container/card-container').then(
    ({ CardContainer }) => ({
      default: CardContainer,
    })
  )
  ),
  [PageBuilderComponentType.CAROUSEL]: lazy(() => import('../../components/carousel-container/carousel-container').then(
    ({ CarouselContainer }) => ({
      default: CarouselContainer,
    })
  )
  ),
  [PageBuilderComponentType.CONTENT]: lazy(() => import('../../components/content-container/content-container').then(
    ({ ContentContainer }) => ({
      default: ContentContainer,
    })
  )
  ),
};
export const loadComponent = (
  compType: PageBuilderComponentType,
  props: any
) => {
  const Component = COMPONENT_MAP[compType];

  if (Component !== undefined) {
    return <Component key={props.id} {...props} />;
  }
};

export const loadComponents = (page: PageBuilderType) => {
  return Object.entries(page).map(([key, val], idx) => {
    if (key === 'componentType' && typeof val === 'string') {
      loadComponent(val as PageBuilderComponentType, {});
    } else if (typeof val === 'object') {
      return loadComponent(val.componentType, val);
    }
    return undefined;
  });
};
