"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  obligation_company_id: string;
  obligation_company_name: string;
}

export default function Home() {
  const [data, setData] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/jobs.json')
      .then((res) => res.json())
      .then((data) => setData(data));
    },
  []);
  
  const jobs = data;
  const everrisJobs = jobs.filter(job => job.obligation_company_name === 'EVERRIS NA INC 941634227');
  const zfWabcoJobs = jobs.filter(job => job.obligation_company_name === 'ZF Wabco');

  const everrisCompanyName = everrisJobs.length > 0 ? everrisJobs[0].obligation_company_name : '';
  const zfWabcoCompanyName = zfWabcoJobs.length > 0 ? zfWabcoJobs[0].obligation_company_name : '';
  
  const everrisCompanyId = everrisJobs.length > 0 ? everrisJobs[0].obligation_company_id : '';
  const zfWabcoCompanyId = zfWabcoJobs.length > 0 ? zfWabcoJobs[0].obligation_company_id : '';

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">
        Statement Invoice Generation
      </h1>
      <div className="flex justify-center gap-4">
        <Link href={`/invoices/${everrisCompanyId}`}>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            {everrisCompanyName}
          </button>
        </Link>
        <Link href={`/invoices/${zfWabcoCompanyId}`}>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            {zfWabcoCompanyName}
          </button>
        </Link>
      </div>
    </main>
  );
}
