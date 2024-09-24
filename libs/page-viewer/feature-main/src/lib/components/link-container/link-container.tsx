import { convertMarkdown } from '@/shared-ui';

export interface LinkProps {
  content?: string;
  href?: string;
  label?: string;
}

export const LinkContainer: React.FC<LinkProps> = ({
  content,
  href,
  label,
}) => {

  return (
    <>
      <a
        className="h-[40px] text-center leading-10 w-min px-4 cursor-pointer bg-violet-900 text-white rounded-full hover:bg-violet-600"
        href={href}
      >
        {label}
      </a>
      {content && (
        <div
          className="text-center pt-2"
          dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
        ></div>
      )}
    </>
  );
};
