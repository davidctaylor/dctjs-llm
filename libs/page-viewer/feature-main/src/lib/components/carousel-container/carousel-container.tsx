import { DctCarousel } from '@dctjs/react';
import { loadComponent } from '../../utils/load-components/load-components';
import {
  MdOutlineArrowRight,
  MdOutlineArrowRightAlt,
  MdOutlineViewSidebar,
} from 'react-icons/md';

export interface CarouselProps {
  cards?: any[];
  id: string;
  imageRef?: string;
  subTitle?: string;
  title?: string;
}

export const CarouselContainer: React.FC<CarouselProps> = ({
  cards,
  id,
  title,
}) => {
  return (
    <div className="flex justify-center max-w-full">
      <DctCarousel data-component-id={id} headerText={title}>
        <span slot="icon">
          <MdOutlineArrowRight size={30} />
        </span>
        {cards &&
          cards.map((component) => {
            return loadComponent(component.componentType, component);
          })}
      </DctCarousel>
    </div>
  );
};
