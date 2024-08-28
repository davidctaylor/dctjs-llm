'use client';

export interface TitleProps {
  id: string;
  subTitle?: string;
  title: string;
}

export const Title: React.FC<TitleProps> = ({id, title, subTitle}) => {
  return (
    <div className="flex flex-col flex-1 py-4" data-component-id={id}>
      <h1 className="text-lg text-center p2">{title}</h1>
      <p className="text-sm text-center p2">{subTitle}</p>
    </div>
  );
};