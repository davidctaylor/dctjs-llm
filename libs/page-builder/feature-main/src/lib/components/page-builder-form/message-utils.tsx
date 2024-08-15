import { PageBuilderMessage } from './interfaces';

export const Message = ({ role, text }: PageBuilderMessage) => {
  switch (role) {
    case 'user':
      return <UserMessage text={text} />;
    case 'assistant':
      return <AssistantMessage text={text} />;
    default:
      return null;
  }
};

const UserMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-1 justify-end p-2">
      <div className="max-w-[70%] rounded-3xl bg-[#f4f4f4] p-2">{text}</div>
    </div>
  );
};

const AssistantMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-1 justify-start">
    <div className="p-2 font-medium">{text}</div>
  </div>
  );
};
