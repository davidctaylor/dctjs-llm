import { PageBuilderSectionRequestType } from '@/shared-data';
import { convertMarkdown } from '@/shared-ui';
import { loadComponent } from '../../utils/load-components/load-components';
export interface SectionContainerProps {
  components: PageBuilderSectionRequestType[];
  content?: string;
  heading: string;
  id: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  content,
  components,
  heading,
  id,
}) => {
  return (
    <section className="flex flex-col flex-1 p-6" data-component-id={id}>
      <div className="border-t w-9/12 self-center"></div>
      <h2 className="text-lg text-center py-6">{heading}</h2>
      {content && (
        <div
          dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
        ></div>
      )}

      <div className="flex flex-col flex-1 gap-y-4 items-center">
        {components.map((component) => {
          return loadComponent(component.componentType, component);
        })}
      </div>
    </section>
  );
};
