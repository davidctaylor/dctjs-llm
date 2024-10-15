import { convertMarkdown } from '@/shared-ui';

import styles from './content-container.module.css';

export interface ContentProps {
  content: string;
}

export const ContentContainer: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className={styles.contentContainer}
      dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
    ></div>
  );
};
