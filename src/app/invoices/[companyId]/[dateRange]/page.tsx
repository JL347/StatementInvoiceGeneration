"use client";

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FileDown, Download } from 'lucide-react';
import { getRelevantDates } from '@/app/methods/dates';
import { Undo2 } from 'lucide-react';
import Papa from 'papaparse';
import { formatToUSD } from '@/app/methods/format';
import axios from 'axios';
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

export default function InvoiceTablePage() {
  const { companyId, dateRange } = useParams()
  const [data, setData] = useState<Job[]>([]);

  useEffect(() => {
    axios.get('/jobs.json')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching jobs:', error));
    },
  []);
  
  const jobs: Job[] = data;
  const filteredJobs = jobs.filter((job: Job) => job.obligation_company_id == companyId);
  const companyName = filteredJobs.length > 0 ? filteredJobs[0].obligation_company_name : '';

  const updatedJobs = getRelevantDates(filteredJobs, Array.isArray(dateRange) ? dateRange[0] : dateRange);

  const obligationAmounts = updatedJobs.map((job) => job.obligation_amount_due);

  const totalObligationAmount = obligationAmounts.reduce((a, b) => a + b, 0);

  const jobsForCsv = updatedJobs.map((job) => ({
    'Issue Date': dayjs(job.obligation_obligation_date).format('MMMM DD, YYYY'),
    'Reference Number': job.reference_number,
    'Obligation Reference Number': job.obligation_reference_number,
    'Notes': job.notes,
    'Due Date': dayjs(job.obligation_due_date).format('MMMM DD, YYYY'),
    'Obligation Amount Due': formatToUSD(job.obligation_amount_due),
  }));

  function downloadAsCSV(data: {
    'Issue Date': string;
    'Reference Number': string;
    'Obligation Reference Number': string;
    'Notes': string;
    'Due Date': string;
    'Obligation Amount Due': string;
    }[],
    filename: string = 'table.csv'): void {
    
    // Convert data to CSV using PapaParse
    const csv = Papa.unparse(data);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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

  const everrisCompanyId = Number(companyId) === 68813;

  return (
    <main className="p-8" id="invoice">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              {companyName} Statement Invoice
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              List of jobs for the week leading up to {dateRange}.
            </p>
            <div>
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
                    {everrisCompanyId && (
                      <MenuItem>
                        <Link href={`/invoices/${companyId}/${julyNinteenthRange}`}>
                          <span
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                          >
                            2024-07-11 - 2024-07-17
                          </span>
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${julyTwelfthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-07-04 - 2024-07-10
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${julyFifthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-06-27 - 2024-07-03
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${juneTwentyEighthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-06-20 - 2024-06-26
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${juneTwentyFirstRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-06-13 - 2024-06-19
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${juneFourteenthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-06-06 - 2024-06-12
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${juneSeventhRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-05-30 - 2024-06-05
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${mayThirtyFirstRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-05-23 - 2024-05-29
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${mayTwentyFourthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-05-16 - 2024-05-22
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${maySeventeenthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-05-09 - 2024-05-15
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${mayTenthRange}`}>
                        <span
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                        >
                          2024-05-02 - 2024-05-08
                        </span>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={`/invoices/${companyId}/${mayThirdRange}`}>
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
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href={`/invoices/${companyId}/${dateRange}/pdf`}>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <FileDown size={16} />
                Download PDF
              </button>
            </Link>
            <button
              type="button"
              className="ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => downloadAsCSV(jobsForCsv, `${companyName} Statement Invoice - ${dateRange}.csv`)}
            >
              <Download size={16} />
              Download CSV
            </button>
            <Link href={`/`}>
              <button className="ml-2 inline-flex items-center gap-x-1.5 border border-gray-100 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <Undo2 size={16} />
                Back
              </button>
            </Link>
          </div>
          
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Issue Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Obligation Company ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Reference Number
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Obligation Reference Number
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Notes
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Due Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Obligation Amount Due
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {updatedJobs.map((job) => (
                      <tr key={job.obligation_company_id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {dayjs(job.obligation_obligation_date).format('MMMM DD, YYYY')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {job.obligation_company_id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {job.reference_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {job.obligation_reference_number}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {job.notes}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dayjs(job.obligation_due_date).format('MMMM DD, YYYY')}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatToUSD(job.obligation_amount_due)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={6} className="text-right py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        Total Amount Due
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">
                        {formatToUSD(totalObligationAmount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
