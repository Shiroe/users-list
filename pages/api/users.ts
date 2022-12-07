// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import { promises as fs } from 'fs';
import type { User } from '../../src/components/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { search = '' } = req.body;
  const jsonDirectory = path.join(process.cwd(), 'src/json');
  const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');

  // consists of filter function in case we wanted to move search index to the backend
  const results = JSON.parse(fileContents).users
    .filter((d: User) => { 
      return d.name.includes(search)
      || d.email.includes(search)
    });
  res.status(200).json(results);
}
