"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

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
        <div>
          <h1 className="text-xl font-medium underline">
            {everrisCompanyName}
          </h1>
          <Menu as="div" className="relative inline-block text-left mt-3">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Select Date Range
                <ChevronDown size={16} className="mt-0.5" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${julyNinteenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-07-11 - 2024-07-17
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${julyTwelfthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-07-04 - 2024-07-10
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${julyFifthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-27 - 2024-07-03
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${juneTwentyEighthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-20 - 2024-06-26
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${juneTwentyFirstRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-13 - 2024-06-19
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${juneFourteenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-06 - 2024-06-12
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${juneSeventhRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-30 - 2024-06-05
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${mayThirtyFirstRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-23 - 2024-05-29
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${mayTwentyFourthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-16 - 2024-05-22
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${maySeventeenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-09 - 2024-05-15
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${mayTenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-02 - 2024-05-08
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${everrisCompanyId}/${mayThirdRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-04-25 - 2024-05-01
                    </span>
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div>
          <h1 className="text-xl font-medium underline">
            {zfWabcoCompanyName}
          </h1>
          <Menu as="div" className="relative inline-block text-left mt-3">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Select Date Range
                <ChevronDown size={16} className="mt-0.5" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${julyTwelfthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-07-04 - 2024-07-10
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${julyFifthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-27 - 2024-07-03
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${juneTwentyEighthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-20 - 2024-06-26
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${juneTwentyFirstRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-13 - 2024-06-19
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${juneFourteenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-06-06 - 2024-06-12
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${juneSeventhRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-30 - 2024-06-05
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${mayThirtyFirstRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-23 - 2024-05-29
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${mayTwentyFourthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-16 - 2024-05-22
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${maySeventeenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-09 - 2024-05-15
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${mayTenthRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-05-02 - 2024-05-08
                    </span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/invoices/${zfWabcoCompanyId}/${mayThirdRange}`}>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                    >
                      2024-04-25 - 2024-05-01
                    </span>
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </main>
  );
}
