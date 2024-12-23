"use client";

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FileDown } from 'lucide-react';
import { getRelevantDates } from '@/app/methods/dates';
import { Undo2 } from 'lucide-react';

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
  const { companyId, dateRange } = useParams()
  const [data, setData] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/jobs.json')
      .then((res) => res.json())
      .then((data) => setData(data));
    },
  []);
  
  const jobs: Job[] = data;
  const filteredJobs = jobs.filter((job: Job) => job.obligation_company_id == companyId);
  const companyName = filteredJobs.length > 0 ? filteredJobs[0].obligation_company_name : '';

  const updatedJobs = getRelevantDates(filteredJobs, Array.isArray(dateRange) ? dateRange[0] : dateRange);

  const obligationAmounts = updatedJobs.map((job) => job.obligation_amount_due);

  const totalObligationAmount = obligationAmounts.reduce((a, b) => a + b, 0);

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
                          ${(job.obligation_amount_due).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={5} className="text-right py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        Total
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">
                        ${totalObligationAmount.toFixed(2)}
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
