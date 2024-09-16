import { DctCarousel } from '@dctjs/react';
import { loadComponent } from '../../utils/load-components/load-components'

export interface CarouselProps {
  cards?: any[];
  id: string;
  imageRef?: string;
  subTitle?: string;
  title?: string;
}

export const CarouselContainer: React.FC<CarouselProps> = ({ cards, id, title }) => {
  return (
    <div className="flex justify-center">
    <DctCarousel data-component-id={id} headerText={title}>
      {cards && cards.map((component) => {
        return loadComponent(component.componentType, component);
      })}
    </DctCarousel>
    </div>
  );
};
