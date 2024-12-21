import { NextApiRequest, NextApiResponse } from 'next';

import jobs from '../data/jobs.json';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json(jobs);

  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Failed to fetch user', { status: 500 });
  }
};
