import { DctAccordion, DctItemHeading, DctItem } from '@dctjs/react';

import { convertMarkdown } from '@/shared-ui';
import { MdArrowDropUp, MdAdd, MdRemove } from 'react-icons/md';
import { useState } from 'react';

export interface AccordionProps {
  content?: string;
  heading?: string;
  id: string;
}

export const AccordionContainer: React.FC<AccordionProps> = ({
  content,
  heading,
  id,
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <DctAccordion className="w-full" data-component-id={id} onAccordionChange={(e) => setOpened(e.detail.expanded)}>
      <DctItemHeading slot="heading" animateIcons={true} >
        <span slot="end">
          {opened ? <MdRemove size={24}/> : <MdAdd size={24}/>}
        </span>
        <p className="text-left" slot="heading">{heading}</p>
      </DctItemHeading>
      <DctItem>
        {content && (
          <div
            dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
          ></div>
        )}
      </DctItem>
    </DctAccordion>
  );
};
