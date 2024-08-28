import { loadComponent } from '../../utils/load-components/load-components';

export interface PageContainerProps {
  id: string;
  title: {
    title: string;
    subTitle: string;
    id: string;
  };
  sections: any;
  componentType: any;
}

export const PageContainer: React.FC<PageContainerProps> = ({ id, sections, title }) => {
  return (
    <div className="flex flex-col flex-1 p-6" data-component-id={id}>
      <h1 className="text-lg text-center p-2">{title.title}</h1>
      {sections.map((section) => {
        return loadComponent(section.componentType, section)
      })}
      
    </div>
  );
};
