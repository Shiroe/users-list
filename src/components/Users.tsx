import React, { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';

import { User } from './User';
import type { UserType } from './User';
import useDebounce from '../hooks/useDebounce';

import ButtonWithIcon from './ButtonWithIcon';

const fetcher = (url: string, params: object) =>
  axios.post(url, { ...params }).then((res) => res.data);

type UsersProps = {
  searchTerm?: string;
}

type OrderBy = 'ASC' | 'DESC';
type OrderByFields = 'role' | 'email' | 'name';

export const Users = ({ searchTerm = '' }: UsersProps) => {
  const [selections, setSelections] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>('ASC');
  const [orderField, setOrderField] = useState<OrderByFields>('name');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);
  const [loadedDataIndex, setLoadedDataIndex] = useState<number>(perPage - 1);

  const debouncedSearchTerm = useDebounce(searchTerm, 200)

  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery(['users', debouncedSearchTerm], 
    () => fetcher('/api/users', { search: debouncedSearchTerm }));


  useEffect(() => {
    setOrderBy('ASC');
    setLoadedDataIndex(perPage - 1)

    return () => {
      setOrderBy('ASC');
    }
  }, [searchTerm, perPage]);

  useEffect(() => {
    const updateLoadedData = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (Math.abs(Math.ceil(scrollHeight) - Math.ceil(currentPosition)) <= 3) {
        setLoadedDataIndex(loadedDataIndex + perPage);
        window.scrollTo({ top: scrollHeight })
      }
      console.log('scrolled', scrollHeight, ' : ', currentPosition);
    }

    window.addEventListener('scroll', updateLoadedData);

    return () => {
      window.removeEventListener('scroll', updateLoadedData);
    }
  })

  const getLoadedItems = (orderedData: UserType[]): UserType[] | [] => {
    return orderedData.slice(0, loadedDataIndex);
  }

  const getItemsOrdered = (): UserType[] | [] => {
    if (!data) return [];

    if (orderBy === 'ASC') {
      return data.sort((a: UserType, b: UserType) => a[orderField].localeCompare(b[orderField]))
    }

    if (orderBy === 'DESC') {
      return (data.sort((a: UserType, b: UserType) => a[orderField].localeCompare(b[orderField])))?.reverse();
    }

    return data;
  }

  const onOrderBy = (field: OrderByFields) => {
    setOrderField(field);

    if (orderBy === 'ASC') {
      setOrderBy('DESC');
    } else {
      setOrderBy('ASC');
    }
  }

  const onSelectAll = () => {
    if (selections.length === data.length) {
      setSelections([]);
    } else {
      setSelections(data.map((item: UserType) => item.id))
    }
  }

  const onSelect = (id: number) => {
    const exists = isUserSelected(id);

    if (!exists) {
      setSelections([...selections, id]);
    }

    if (exists) {
      const newArray = [...selections];
      newArray.splice(selections.indexOf(id), 1)
      setSelections(newArray);
    }
    console.log('updated selections: ', selections)
  }

  function isUserSelected (id: number): boolean {
    return selections.indexOf(id) > -1;
  }

  //Handle the error state
  if (error) {
    return (
      <AlternateMessageContainer>
        <>Failed to load {error}</>
      </AlternateMessageContainer>
    );
  }
  //Handle the loading state
  if (isLoading) {
    return (
      <AlternateMessageContainer>
        Loading...
      </AlternateMessageContainer>
    );
  }

  if (!data.length) {
    return (
      <AlternateMessageContainer>
        No Users found with these search params.
      </AlternateMessageContainer>
    );
  }

  return (
    <div className='bg-white p-3 rounded-md mt-4'>
      <div className='flex justify-start p-2'>
        <div className='w-28 mx-2'>
          {selections.length > 0 ?
            (
              <h4 className='text-lg text-gray-80'>{selections.length} Selected</h4>
            ) : null
          }
        </div>
        <ButtonWithIcon
          className='flex content-center px-2 py-1 text-gray-60 border-gray-30 border-2 rounded-sm mr-1 hover:text-gray-80 hover:border-gray-50'
          onClick={() => selections.length ? alert(`Edit ${selections.length} Users?`) : null}
          btnType='edit'
          label='Edit'
        />
        <ButtonWithIcon
          className='flex content-center px-2 py-1 text-gray-60 border-gray-30 border-2 rounded-sm hover:text-gray-80 hover:border-gray-50'
          onClick={() => selections.length ? alert(`Delete ${selections.length} Users?`) : null}
          btnType='delete'
          label='Delete'
        />
      </div>
      <div className='w-full flex p-2 rounded-md justify-start'>
        <div className='w-72 flex self-end'>
          <input className='mx-2 w-3 hover:cursor-pointer' type={'checkbox'} onChange={onSelectAll} />
          <div className='flex mx-2 text-sm text-gray-60 w-full'>
            <span
              onClick={() => onOrderBy('name')}
              className='cursor-pointer'
            >
              User
            </span>
            {orderField === 'name'?
              (<Image
                className='object-contain mx-1'
                alt='ordering icon'
                width={18}
                height={18}
                src={orderBy === 'ASC' ? '/assets/arrow-up.svg' : '/assets/arrow-down.svg'}
              />) 
              : null
            }
          </div>
        </div>
        <div className='flex self-end px-2'>
          <div className='flex mx-2 text-sm text-gray-60 w-full cursor-pointer'>
            <span
              className='cursor-pointer'
              onClick={() => onOrderBy('role')}
            >
              Permission 
            </span>
            {orderField === 'role'?
              (<Image
                className='object-contain mx-1'
                alt='ordering icon'
                width={18}
                height={18}
                src={orderBy === 'ASC' ? '/assets/arrow-up.svg' : '/assets/arrow-down.svg'}
              />) 
              : null
            }
          </div>
        </div>
      </div>
      {getLoadedItems(getItemsOrdered()).map((item: UserType) => (
        <User
          onSelect={onSelect} 
          isSelected={isUserSelected(item.id)} 
          user={item}
          key={item.id}
          editButton={
            <ButtonWithIcon 
              className='flex items-center justify-center w-12 h-6 py-0.5 text-gray-60 border-gray-30 border-2 rounded-sm mr-1 hover:text-gray-50 hover:border-gray-50'
              onClick={() => alert(`Edit ${item.name} ?`)}
              btnType='edit'
            />
          }
          deleteButton={
            <ButtonWithIcon 
              className='flex items-center justify-center w-7 h-6 py-0.5 text-gray-60 border-gray-30 border-2 rounded-sm mr-1 hover:text-gray-50 hover:border-gray-50'
              onClick={() => alert(`Delete ${item.name} ?`)}
              btnType='delete'
            />
          }
        />
      ))}
    </div>
  );
}

const AlternateMessageContainer = ({ children }: any) => {
  return (
    <div className='bg-white p-3 rounded-md mt-4'>
      <h3 className='text-lg text-gray-60'>
        {children}
      </h3>
    </div>
  );
}


