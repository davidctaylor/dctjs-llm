import { PageBuilderComponentEnum } from '@/shared-data';

export interface PageTitleProps {
  componentType: PageBuilderComponentEnum;
  title: string;
  subTitle?: string;
  id: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ id, title }) => {
  console.log('XXX IN PAGE CONTAINER PROPS', title);
  return (
    <div className="flex flex-col flex-1 p-6" data-component-id={id}>
      <h1 className="text-lg text-center p-2">{title}</h1>
      <h2 className="text-sm text-center p-2">{title}</h2>
    </div>
  );
};
