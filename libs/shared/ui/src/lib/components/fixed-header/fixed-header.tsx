'use client';

import { MdOutlineViewSidebar, MdEditDocument } from 'react-icons/md';
import { DctButton } from '@dctjs/react';

export interface FixedHeaderProps {
  title: string;
  sideBarEvent: (e: 'edit' | 'update') => void
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({ sideBarEvent, title }) => {
  return (
    <header className="flex gap-x-4 items-center px-6 pt-6 w-full">
      <nav>
        <ul className="flex">
          <li>
            <DctButton
              className="self-end overflow-hidden [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('update')}
            >
              <MdOutlineViewSidebar size={22} />
            </DctButton>
          </li>
          <li>
            <DctButton
              className="self-end overflow-hidden [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('edit')}
            >
              <MdEditDocument size={22} />
            </DctButton>
          </li>
        </ul>
      </nav>
      <h1 className="flex-1 text-2xl text-center p-0">{title}</h1>
    </header>
  );
};

export default FixedHeader;
