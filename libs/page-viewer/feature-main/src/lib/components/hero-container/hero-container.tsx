import { PageBuilderComponentEnum } from '@/shared-data';
import { loadComponent } from '../../utils/load-components/load-components';

export interface HeroContainerProps {
  imageRef?: string;
}

export const HeroContainer: React.FC<HeroContainerProps> = ({ imageRef }) => {
  return (
    <div className="flex w-full max-h-[250px] pb-8">
      {imageRef && <img className="object-scale-down object-center" src={imageRef} />}
    </div>
  );
};