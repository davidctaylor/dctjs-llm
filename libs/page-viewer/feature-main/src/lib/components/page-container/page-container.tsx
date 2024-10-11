import { PageBuilderComponentEnum } from '@/shared-data';
import { loadComponent } from '../../utils/load-components/load-components';
import { HeroContainer } from '../hero-container/hero-container';

export interface PageContainerProps {
  componentType: PageBuilderComponentEnum;
  hero: {
    componentType: PageBuilderComponentEnum;
    id: string;
    imageRef: string;   
  }
  id: string;
  pageContent?: {
    content: string;
    componentType: PageBuilderComponentEnum;
    id: string;
  }
  title?: {
    title: string;
    subTitle?: string;
    id: string;
  };
  sections?: any;
}

export const PageContainer: React.FC<PageContainerProps> = ({ id, pageContent, sections, title, hero }) => {
  return (
    <div className="flex flex-col flex-1 p-6" data-component-id={id}>
      {hero && <HeroContainer componentType={hero.componentType} id={hero.id} imageRef={hero.imageRef}></HeroContainer>}
      {title && title?.title && <h1 className="text-lg text-center p-2">{title?.title}</h1>}
      {title && title?.subTitle && <h2 className="text-sm text-center p-2">{title?.subTitle}</h2>}
      {pageContent && loadComponent(pageContent.componentType, pageContent) }
      {sections && sections.map((section: any) => {
        return loadComponent(section.componentType, section)
      })}
    </div>
  );
};
