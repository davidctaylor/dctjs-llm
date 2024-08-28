'use client';

export interface HeadingProps {
  title?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="flex flex-col flex-1 p-6">
      <h1 className="text-lg text-center p-2">{title}</h1>
    </div>
  );
};