"use client";

import Link from 'next/link';
import jobs from '../data/jobs.json';

export default function Home() {

  const everrisJobs = jobs.filter(job => job.obligation_company_name === 'EVERRIS NA INC 941634227');
  const zfWabcoJobs = jobs.filter(job => job.obligation_company_name === 'ZF Wabco');

  const everrisCompanyId = everrisJobs[0].obligation_company_id;
  const zfWabcoCompanyId = zfWabcoJobs[0].obligation_company_id;

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">
        Statement Invoice Generation
      </h1>
      <div>
        <Link href={`/invoices/${everrisCompanyId}`}>
          <button className="text-2xl font-semibold text-blue-500">EVERRIS NA INC 941634227</button>
        </Link>
        <Link href={`/invoices/${zfWabcoCompanyId}`}>
          <button className="text-2xl font-semibold text-blue-500">ZF Wabco</button>
        </Link>
      </div>
    </main>
  );
}
