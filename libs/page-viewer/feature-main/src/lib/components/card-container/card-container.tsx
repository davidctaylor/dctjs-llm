import { DctCard, DctCardTitle, DctCardContent } from '@dctjs/react';

import { convertMarkdown } from '@/shared-ui';

export interface CardProps {
  content?: string;
  id: string;
  href: string;
  imageRef?: string;
  subTitle?: string;
  title?: string;
}

export const CardContainer: React.FC<CardProps> = ({
  content,
  href,
  id,
  imageRef,
  title,
  subTitle,
}) => {
  return (
    <DctCard data-component-id={id} border="outlined" href={href}>
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
            dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
          ></div>
        </DctCardContent>
      )}
    </DctCard>
  );
};
