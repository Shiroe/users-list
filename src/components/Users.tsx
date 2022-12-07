import React, { useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import axios from 'axios';

import { FixedSizeList as List } from 'react-window';
import { User } from './User';

const fetcher = (url: string, search: string) =>
  axios.post('/api/users', { search }).then((res) => res.data);

type UsersProps = {
  searchTerm?: string;
}

export const Users = ({ searchTerm = 'gar' }: UsersProps) => {
  const [selections, setSelections] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery(['users'], 
    () => fetcher('/api/users', searchTerm));

  const onSelect = (id: number) => {
    const exists = selections.includes(id);

    if (!exists) {
      setSelections([...selections, data[id]]);
    }

    if (exists) {
      const newArray = [...selections].splice(selections.indexOf(id), 1);
      setSelections(newArray);
    }
  }

  //Handle the error state
  if (error) return <div><>Failed to load {error}</></div>;
  //Handle the loading state
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h4>Selected</h4>
      <List
        width={680}
        height={64 * data.length}
        itemSize={64}
        itemCount={data.length}
        itemData={data.filter((d: User) => { 
          return d.name.toLowerCase().includes(searchTerm.toLowerCase())
          || d.email.toLowerCase().includes(searchTerm.toLowerCase())
        })}
      >
        {(item) => <User onSelect={onSelect} isSelected={selections.includes(item.data[item.index].id)} user={item.data[item.index]} key={item.index} style={item.style} />}
      </List>
    </>
  );
}

