'use client';

import { useState } from 'react';
import { DctButton } from '@dctjs/react';
import {
  MdArrowBack,
  MdClose,
  MdArrowForward
} from 'react-icons/md';

export interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  position: 'left' | 'right'
  title: string;
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
      className={`border-r flex flex-col flex-1 overflow-hidden max-w-[400px] relative transition-all duration-200 sidebar  ${
        isOpen ? 'w-full' : 'w-0 max-w-0'
      }`}
    >
      <div className="flex items-center px-6 pt-6">
        <DctButton
          className="overflow-hidden [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
          ripple={false}
          button-style="text"
          iconButton={true}
          onDctButtonClick={openEvent}
        >
          {position === 'left' ?  <MdArrowBack size={32} /> : <MdClose size={32}/>}
         
        </DctButton>
        <div className="flex-1">{title}</div>
        <DctButton
          className="self-end overflow-hidden [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
          ripple={false}
          button-style="text"
          iconButton={true}
          onDctButtonClick={openEvent}
        >
          {position === 'left' ? <MdClose size={32}/> : <MdArrowForward size={32}/>}
        </DctButton>
      </div>
      <div className="flex-1 p-6 sidebar-content">{children}</div>
    </div>
  );
};
