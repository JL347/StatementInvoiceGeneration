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
import { tableData, totalData } from "./data";
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';

interface Job {
  obligation_company_id: string;
  obligation_company_name: string;
  obligation_obligation_date: string;
  reference_number: string;
  obligation_reference_number: string;
  status: string;
  notes: string;
  obligation_due_date: string;
  obligation_amount_due: number;
}

export default function InvoicePDFPage() {
  const { companyId } = useParams();
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
            <TD style={styles.td}>Status</TD>
            <TD style={styles.td}>Notes</TD>
            <TD style={styles.td}>Due Date</TD>
            <TD style={styles.td}>Obligation Amount Due</TD>
          </TH>
          {filteredJobs.map((job, index) => (
            <TR key={index}>
              <TD style={styles.td}>
                {dayjs(job.obligation_obligation_date).format('MMMM DD, YYYY h:mm A')}
              </TD>
              <TD style={styles.td}>
                {job.reference_number}
              </TD>
              <TD style={styles.td}>
                {job.obligation_reference_number}
              </TD>
              <TD style={styles.td}>
                {job.status === 'approved' ? (
                  <Text style={styles.textBold}>Approved</Text>
                ) : (
                  <Text style={styles.textBold}>Pending</Text>
                )}
              </TD>
              <TD style={styles.td}>
                {job.notes}
              </TD>
              <TD style={styles.td}>
                {dayjs(job.obligation_due_date).format('MMMM DD, YYYY h:mm A')}
              </TD>
              <TD style={styles.td}>
                ${(job.obligation_amount_due).toFixed(2)}
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
            {totalData.map((item) => (
              <View
                key={item.label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <Text style={item.label === "Total" ? styles.textBold : {}}>
                  {item.label}
                </Text>
                <Text style={item.label === "Total" ? styles.textBold : {}}>
                  {item.value}
                </Text>
              </View>
            ))}
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
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Download PDF
              </button>
            </PDFDownloadLink>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}