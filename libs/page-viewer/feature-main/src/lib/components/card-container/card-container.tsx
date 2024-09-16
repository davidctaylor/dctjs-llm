import { DctCard, DctCardTitle, DctCardContent } from '@dctjs/react';

import { convertMarkdown } from '@/shared-ui';

export interface CardProps {
  content?: string;
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

export const CardContainer: React.FC<CardProps> = ({
  content,
  id,
  imageRef,
  title,
  subTitle,
}) => {
  return (
    <DctCard data-component-id={id} border="outlined">
      {imageRef && <img src={imageRef} />}
      {title && (
        <DctCardTitle>
          <span>{title}</span>
          {subTitle && <span slot="sub-title">{subTitle}</span>}
        </DctCardTitle>
      )}
      {content && (
        <DctCardContent>
          <div
            dangerouslySetInnerHTML={{ __html: convertMarkdown.parse(content) }}
          ></div>
        </DctCardContent>
      )}
    </DctCard>
  );
};
