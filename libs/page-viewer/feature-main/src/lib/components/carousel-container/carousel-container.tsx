import { DctCarousel } from '@dctjs/react';
import { marked } from 'marked';
import { loadComponent } from '../../utils/load-components/load-components';
import styles from './carousel-container.module.css'

export interface CarouselProps {
  cards?: any[];
  id: string;
  imageRef?: string;
  subTitle?: string;
  title?: string;
}

// content: z.string().optional(),
// href: z.string().optional(),
// imageRef: z.string().optional(),
// title: z.string().optional(),
// subTitle: z.string().optional(),

export const CarouselContainer: React.FC<CarouselProps> = ({ cards, id }) => {
  return (
    <div className="flex justify-center">
    <DctCarousel data-component-id={id}>
      {cards && cards.map((component) => {
        return loadComponent(component.componentType, component);
      })}
    </DctCarousel>
    </div>
  );
};
