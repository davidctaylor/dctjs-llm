import { convertMarkdown } from '@/shared-ui';

import styles from './content-container.module.css';

export interface ContentProps {
  content: string;
  id: string;
}

export const ContentContainer: React.FC<ContentProps> = ({ content, id }) => {
  return (
    <div className={styles.contentContainer}
      data-component-id={id}
      dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
    ></div>
  );
};
