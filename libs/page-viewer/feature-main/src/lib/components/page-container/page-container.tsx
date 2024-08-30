import { PageBuilderComponentType } from '@/shared-data';
import { loadComponent } from '../../utils/load-components/load-components';

export interface PageContainerProps {
  componentType: PageBuilderComponentType;
  id: string;
  pageContent?: {
    content: string;
    componentType: PageBuilderComponentType;
    id: string;
  }
  title?: {
    title: string;
    subTitle?: string;
    id: string;
  };
  sections?: any;
}

export const PageContainer: React.FC<PageContainerProps> = ({ id, pageContent, sections, title }) => {
  return (
    <div className="flex flex-col flex-1 p-6" data-component-id={id}>
      <h1 className="text-lg text-center p-2">{title?.title}</h1>
      <h2 className="text-sm text-center p-2">{title?.subTitle}</h2>
      {pageContent && loadComponent(pageContent.componentType, pageContent) }
      {sections && sections.map((section: any) => {
        return loadComponent(section.componentType, section)
      })}
    </div>
  );
};
