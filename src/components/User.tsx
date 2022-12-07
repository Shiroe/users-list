import React, { useState, useEffect } from 'react';

import { ImageFallback } from './ImageFallback';

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
};

type UserProps = {
  user: User;
  key?: number;
  style?: any;
  isSelected?: boolean; 
  onSelect?: (id: number) => void;
}

const colorTag = (role: string) => {
  if (role === 'ADMIN') return 'purple';
  if (role === 'AGENT') return 'blue';
  if (role === 'ACCOUNT_MANAGER') return 'pink';
  if (role === 'EXTERNAL_REVIEWER') return 'orange';
}

export const User = ({ user, style, onSelect, isSelected = false }: UserProps) => {
  const [selected, setSelected] = useState(isSelected);

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
      <div className='w-full flex p-2 rounded-md mb-4' style={style}>
        <input
          type='checkbox'
          className='mx-2 w-3'
          checked={selected}
          onChange={onCheckboxChange}
        />
        {Boolean(user?.avatar) && (
          <div className='rounded mx-2 flex flex-wrap w-8 content-center'>
            <ImageFallback
              className='rounded-full'
              src={user.avatar}
              fallbackSrc='/styles/assets/avatar.svg'
              alt=''
              width={32}
              height={32}
            />
          </div>
        )}
        <div className='mx-2 w-56'>
          <span className='block text-base'>{user.name}</span>
          <span className='block text-base text-gray-60'>{user.email}</span>
        </div>
        <div className='mx-2 flex flex-wrap content-center'>
          <div className={`px-2 py-0.5 text-base rounded-sm bg-${colorTag(user.role)}-20 text-${colorTag(user.role)}-80`}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </div>
        </div>
      </div>
    </>
  );
}