'use client';

import { DctButton } from '@dctjs/react';
import {
  MdClose,
} from 'react-icons/md';

export interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  position: 'left' | 'right'
  title?: string;
  openEvent: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen,
  position,
  title,
  openEvent,
}) => {


  return (
    <div
      className={`border-r flex flex-col flex-1 overflow-hidden relative transition-all duration-200 sidebar  ${
        isOpen ? 'w-full max-w-[450px]' : 'w-0 max-w-[0px]'
      } ${position === 'right' ? 'border-l' : 'border-r'}`}
    >
      <div className="flex items-center px-6 pt-6">
        {position === 'right' && <DctButton
          className="text-slate-700 w-[32px] h-[32px]"
          ripple={false}
          button-style="text"
          iconButton={true}
          onDctButtonClick={openEvent}
        >
         <MdClose size={32}/>
        </DctButton>}
        <div className="flex-1 pl-4">{title}</div>
        {position === 'left' && <DctButton
          className="self-end text-slate-700 w-[32px] h-[32px]"
          ripple={false}
          button-style="text"
          iconButton={true}
          onDctButtonClick={openEvent}
        >
          <MdClose size={32}/>
        </DctButton>}
      </div>
      <div className="flex-1 p-6 sidebar-content">{children}</div>
    </div>
  );
};
