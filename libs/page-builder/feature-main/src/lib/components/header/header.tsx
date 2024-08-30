import { MdOutlineViewSidebar, MdEditDocument } from 'react-icons/md';
import { DctButton } from '@dctjs/react';

export interface FixedHeaderProps {
  sideBarEvent: (e: 'edit' | 'update') => void
}

export const Header: React.FC<FixedHeaderProps> = ({ sideBarEvent }) => {
  return (
    <header className="flex gap-x-4 items-center p-4 w-full">
      <nav className="flex flex-1">
        <ul className="flex flex-1 justify-between">
          <li className="h-[40px]">
            <DctButton
              className="self-end overflow-hidden text-slate-700 [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('update')}
            >
              <MdOutlineViewSidebar size={32} />
            </DctButton>
          </li>
          <li className="h-[40px]">
            <DctButton
              className="self-end text-slate-700 overflow-hidden [&>*:hover]:outline-fantarka-blue [&>*:hover]:outline [&>*]:rounded-full [&>*]:outline-offset-4 [&>*]:outline-1"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('edit')}
            >
              <MdEditDocument size={32} color='rgb(30 41 59)'/>
            </DctButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};
