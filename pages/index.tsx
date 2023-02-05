import Head from 'next/head'
import { useState } from 'react';

import { Users } from '../src/components/Users';
import { SearchComponent } from '../src/components/SearchComponent'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = ev;
    setSearchTerm(value);
  }


  return (
    <div className='bg-gray-20'>
      <Head>
        <title>Users List Page</title>
        <meta name="list of users" content="Randomly generated users rendered by nextjs app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-full min-h-screen md:max-w-screen-md mx-auto px-8 py-8 text-base'>
        <SearchComponent
          className='flex justify-end'
          title={
            <h3 className='text-xl mr-auto self-center'>
              Account Users
            </h3>
          }
          input={
            <input
              className='px-2 h-10 w-52 mr-3 rounded'
              placeholder='Search'
              value={searchTerm}
              onChange={onSearchChange}
            />
          }
          button={
            <button className='h-10 w-24 rounded bg-brand-50 text-gray-20 text-md'>
              Connect users
            </button>
          }
        />
        <Users searchTerm={searchTerm}/>
      </main>
    </div>
  )
}
