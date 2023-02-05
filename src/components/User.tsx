import React, { useState, useEffect } from 'react';

import { ImageFallback } from './ImageFallback';

export type UserType = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
};

type UserProps = {
  user: UserType;
  key?: number;
  style?: any;
  editButton: JSX.Element;
  deleteButton: JSX.Element;
  isSelected?: boolean; 
  onSelect?: (id: number) => void;
}

const colorTag = (role: string) => {
  if (role === 'ADMIN') return 'purple';
  if (role === 'AGENT') return 'blue';
  if (role === 'ACCOUNT_MANAGER') return 'pink';
  if (role === 'EXTERNAL_REVIEWER') return 'orange';
}

export const User = ({ user, style, onSelect, isSelected = false, editButton, deleteButton }: UserProps) => {
  const [selected, setSelected] = useState(isSelected);
  const [showTasks, setShowTasks] = useState<boolean>(false);

  useEffect(() => {
    setSelected(isSelected);

    return () => {
      setSelected(false);
    }
  }, [isSelected]);

  const role: string = user.role.replace('_', ' ').toLowerCase();

  const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    const newVal = !selected;
    setSelected(newVal);
    if (onSelect) onSelect(user.id);
  }

  if (!user) return null;

  return (
    <>
      <div
        className={`w-full flex p-2 rounded-md mb-1 ${selected ? 'border-l-4 border-brand-50 bg-gray-100' : 'border-l-0'}`} style={style}
        onMouseEnter={() => setShowTasks(true)}
        onMouseLeave={() => setShowTasks(false)}
      >
        <input
          type='checkbox'
          className='mx-2 w-3 hover:cursor-pointer'
          checked={selected}
          onChange={onCheckboxChange}
        />
        {Boolean(user?.avatar) && (
          <div className='mx-2 w-7 flex flex-wrap content-center'>
            <ImageFallback
              className='rounded-full object-cover h-7 w-7'
              src={user.avatar}
              fallbackSrc='/assets/avatar.svg'
              alt='avatar'
              width={32}
              height={32}
            />
          </div>
        )}
        <div className='mx-2 w-52 flex flex-col flex-wrap'>
          <span className='block text-base'>{user.name}</span>
          <span className='block text-base text-gray-60'>{user.email}</span>
        </div>
        <div className='mx-2 flex flex-wrap content-center'>
          <div className={`px-2 py-0.5 text-base rounded-sm bg-${colorTag(user.role)}-20 text-${colorTag(user.role)}-80`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>
        </div>
        <div className='flex justify-end flex-grow items-center'>
          {showTasks ? (
            <>
              {editButton}
              {deleteButton}
            </>
          ): null}
        </div>
      </div>
    </>
  );
}