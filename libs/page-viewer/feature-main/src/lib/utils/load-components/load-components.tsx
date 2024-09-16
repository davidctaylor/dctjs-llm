import { lazy } from 'react';

import {
  PageBuilderComponentEnum,
  PageBuilderComponentSectionEnum,
  PageBuilderType,
} from '@/shared-data';

const COMPONENT_MAP: Record<
  PageBuilderComponentEnum | PageBuilderComponentSectionEnum,
  any
> = {
  [PageBuilderComponentEnum.PAGE_CONTAINER]: lazy(() =>
    import('../../components/page-container/page-container').then(
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
  [PageBuilderComponentEnum.PAGE_SECTION]: lazy(() =>
    import('../../components/section-container/section-container').then(
      ({ SectionContainer }) => ({
        default: SectionContainer,
      })
    )
  ),
  [PageBuilderComponentEnum.PAGE_TITLE]: lazy(() =>
    import('../../components/page-title/page-title').then(
      ({ PageTitle }) => ({
        default: PageTitle,
      })
    )
  ),
  [PageBuilderComponentEnum.CONTENT]: lazy(() =>
    import('../../components/content-container/content-container').then(
      ({ ContentContainer }) => ({
        default: ContentContainer,
      })
    )
  ),
  [PageBuilderComponentSectionEnum.ACCORDION]: undefined,
  [PageBuilderComponentSectionEnum.BUTTON]: undefined,
  [PageBuilderComponentSectionEnum.CARD]: lazy(() =>
    import('../../components/card-container/card-container').then(
      ({ CardContainer }) => ({
        default: CardContainer,
      })
    )
  ),
  [PageBuilderComponentSectionEnum.CAROUSEL]: lazy(() =>
    import('../../components/carousel-container/carousel-container').then(
      ({ CarouselContainer }) => ({
        default: CarouselContainer,
      })
    )
  ),
};
export const loadComponent = (
  compType: PageBuilderComponentEnum | PageBuilderComponentSectionEnum,
  props: any
) => {
  const Component = COMPONENT_MAP[compType as PageBuilderComponentEnum | PageBuilderComponentSectionEnum];
  if (Component !== undefined) {
    // console.log('XXX INIT Component', compType, props);
    return <Component key={props.id} {...props} />;
  }
  console.error(`Unknown component type ${compType}`)
};

export const loadComponents = (pageObject: PageBuilderType) => {
  return Object.entries(pageObject).map(([key, val]) => {
    if (key === 'componentType' && typeof val === 'string') {
      loadComponent(val as PageBuilderComponentEnum, {});
    } else if (typeof val === 'object') {
      return loadComponent(val.componentType as PageBuilderComponentEnum, val);
    }
    return undefined;
  });
};
