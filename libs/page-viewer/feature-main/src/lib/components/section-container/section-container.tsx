import { PageBuilderSectionRequestType } from '@/shared-data';
import { loadComponent } from '../../utils/load-components/load-components';
export interface SectionContainerProps {
  id: string;
  components: PageBuilderSectionRequestType[];
  heading: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  components,
  heading,
}) => {
  return (
    <section className="flex flex-col flex-1 p-6" data-component-id={id}>
      <h2 className="text-lg text-center p-2">{heading}</h2>
      {components.map((component) => {
        return loadComponent(component.componentType, component);
      })}
    </section>
  );
};
