"use client";

import { useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { styles } from "./styles";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { getRelevantDates } from '@/app/methods/dates';
import Link from 'next/link';
import { FileDown, Undo2 } from 'lucide-react';
import { formatToUSD } from '@/app/methods/format';

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

export default function InvoicePDFPage() {
  const { companyId, dateRange } = useParams();
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

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
            <Text>Statement Invoice #1</Text>
          </View>
          <View style={styles.spaceY}>
            <Text style={styles.textBold}>{companyName}</Text>
            <Text>123 Business Street</Text>
            <Text>San Diego, CA 12345</Text>
          </View>
        </View>

        <View style={styles.spaceY}>
          <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
          <Text>Denim</Text>
          <Text>123 Main Street</Text>
          <Text>Seattle, WA 12345</Text>
        </View>

        <Table style={styles.table}>
          <TH style={[styles.tableHeader, styles.textBold]}>
            <TD style={styles.td}>Issue Date</TD>
            <TD style={styles.td}>Reference Number</TD>
            <TD style={styles.td}>Obligation Reference Number</TD>
            <TD style={styles.td}>Notes</TD>
            <TD style={styles.td}>Due Date</TD>
            <TD style={styles.td}>Obligation Amount Due</TD>
          </TH>
          {updatedJobs.map((job, index) => (
            <TR key={index}>
              <TD style={styles.td}>
                {dayjs(job.obligation_obligation_date).format('MMMM DD, YYYY')}
              </TD>
              <TD style={styles.td}>
                {job.reference_number}
              </TD>
              <TD style={styles.td}>
                {job.obligation_reference_number}
              </TD>
              <TD style={styles.td}>
                {job.notes}
              </TD>
              <TD style={styles.td}>
                {dayjs(job.obligation_due_date).format('MMMM DD, YYYY')}
              </TD>
              <TD style={styles.td}>
                {formatToUSD(job.obligation_amount_due)}
              </TD>
            </TR>
          ))}
        </Table>

        <View style={styles.totals}>
          <View
            style={{
              minWidth: "256px",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Text style={{ marginLeft: "75px"}}>
                Total Amount Due
              </Text>
              <Text style={styles.textBold}>
                {formatToUSD(totalObligationAmount)}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      {data ? (
        <div className="w-full h-full p-8">
          <div className="w-100 h-[750px]">
            <PDFViewer width="100%" height="100%">
              <InvoicePDF />
            </PDFViewer>
          </div>
          <div className="mt-6 flex justify-center">
            <PDFDownloadLink document={<InvoicePDF />} fileName={`${companyName} Statement Invoice.pdf`}>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <FileDown size={16} />
                Download PDF
              </button>
            </PDFDownloadLink>
            <Link href={`/invoices/${companyId}/${dateRange}`}>
              <button className="ml-2 inline-flex items-center gap-x-1.5 border border-gray-100 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <Undo2 size={16} />
                Back
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}