import { PageBuilderComponentEnum } from '@/shared-data';
import { loadComponent } from '../../utils/load-components/load-components';

export interface HeroContainerProps {
  componentType: PageBuilderComponentEnum;
  id: string;
  imageRef?: string;
}

export const HeroContainer: React.FC<HeroContainerProps> = ({ id, imageRef }) => {
  return (
    <div className="flex w-full max-h-[250px] pb-8" data-component-id={id}>
      {imageRef && <img className="object-scale-down object-center" src={imageRef} />}
    </div>
  );
};