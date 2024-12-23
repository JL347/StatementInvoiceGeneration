"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  obligation_company_id: string;
  obligation_company_name: string;
  obligation_obligation_date: string;
  reference_number: string;
  obligation_reference_number: string;
  notes: string;
  obligation_due_date: string;
  obligation_amount_due: number;
}

export default function Home() {
  const [data, setData] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/jobs.json')
      .then((res) => res.json())
      .then((data) => setData(data));
    },
  []);
  
  const jobs: Job[] = data;
  const everrisJobs = jobs.filter(job => job.obligation_company_name === 'EVERRIS NA INC 941634227');
  const zfWabcoJobs = jobs.filter(job => job.obligation_company_name === 'ZF Wabco');

  const everrisCompanyName = everrisJobs.length > 0 ? everrisJobs[0].obligation_company_name : '';
  const zfWabcoCompanyName = zfWabcoJobs.length > 0 ? zfWabcoJobs[0].obligation_company_name : '';

  const everrisCompanyId = everrisJobs.length > 0 ? everrisJobs[0].obligation_company_id : '';
  const zfWabcoCompanyId = zfWabcoJobs.length > 0 ? zfWabcoJobs[0].obligation_company_id : '';

  const julyNinteenthRange = "2024-07-19";
  const julyTwelfthRange = "2024-07-12";
  const julyFifthRange = "2024-07-05";
  const juneTwentyEighthRange = "2024-06-28";
  const juneTwentyFirstRange = "2024-06-21";
  const juneFourteenthRange = "2024-06-14";
  const juneSeventhRange = "2024-06-07";
  const mayThirtyFirstRange = "2024-05-31";
  const mayTwentyFourthRange = "2024-05-24";
  const maySeventeenthRange = "2024-05-17";
  const mayTenthRange = "2024-05-10";
  const mayThirdRange = "2024-05-03";

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold underline">
        Statement Invoice Generation
      </h1>
      <div className="flex justify-center space-x-12">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold underline">
            {everrisCompanyName}
          </h1>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${julyNinteenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of July 19th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${julyTwelfthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of July 12th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${julyFifthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of July 5th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${juneTwentyEighthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 28th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${juneTwentyFirstRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 21st
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${juneFourteenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 14th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${juneSeventhRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 7th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${mayThirtyFirstRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 31st
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${mayTwentyFourthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 24th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${maySeventeenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 17th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${mayTenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 10th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${everrisCompanyId}/${mayThirdRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 3rd
              </button>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold underline">
            {zfWabcoCompanyName}
          </h1>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${julyTwelfthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of July 12th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${julyFifthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of July 5th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${juneTwentyEighthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 28th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${juneTwentyFirstRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 21st
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${juneFourteenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 14th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${juneSeventhRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of June 7th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${mayThirtyFirstRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 31st
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${mayTwentyFourthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 24th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${maySeventeenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 17th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${mayTenthRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 10th
              </button>
            </Link>
          </div>
          <div>
            <Link href={`/invoices/${zfWabcoCompanyId}/${mayThirdRange}`}>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Week of May 3rd
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
