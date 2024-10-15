import { MdOutlineViewSidebar, MdEditDocument, MdOutlineHelpOutline } from 'react-icons/md';
import { DctButton } from '@dctjs/react';

export interface FixedHeaderProps {
  sideBarEvent: (e: 'edit' | 'help' | 'update') => void
}

export const Header: React.FC<FixedHeaderProps> = ({ sideBarEvent }) => {
  return (
    <header className="flex gap-x-4 items-center p-4 w-full">
      <nav className="flex flex-1">
        <ul className="flex flex-1 gap-x-2 justify-between">
          <li className="h-[40px]">
            <DctButton
              className="self-end text-slate-700 w-[40px] h-[40px]"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('update')}
            >
              <MdOutlineViewSidebar size={30} />
            </DctButton>
          </li>
          <li className="h-[40px] ml-auto">
            <DctButton
              className="self-end text-slate-700w-[40px] h-[40px]"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('help')}
            >
              < MdOutlineHelpOutline size={30} color='rgb(30 41 59)'/>
            </DctButton>
          </li>
          <li className="h-[40px]">
            <DctButton
              className="self-end text-slate-700w-[40px] h-[40px]"
              ripple={false}
              button-style="text"
              iconButton={true}
              onDctButtonClick={() => sideBarEvent('edit')}
            >
              <MdEditDocument size={30} color='rgb(30 41 59)'/>
            </DctButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};
