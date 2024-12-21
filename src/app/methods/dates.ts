import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

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

export const getRelevantDates = (
  jobs: Job[],
  currentDate: string = dayjs().format("YYYY-MM-DD") // Default to today's date
): Job[] => {
  // Parse the current date
  const currentDay = dayjs(currentDate);

  // Get the current Wednesday (or the closest previous Wednesday)
  const currentWednesday = currentDay.day() >= 3 
    ? currentDay.day(3) // This week's Wednesday
    : currentDay.subtract(1, "week").day(3); // Previous week's Wednesday

  // Get the prior Thursday
  const priorThursday = currentWednesday.subtract(6, "day"); // 6 days back

  // Filter receivables within the range
  const relevantJobs = jobs.filter((job) => {
    const jobDate = dayjs(job.obligation_obligation_date);
    return jobDate.isBetween(priorThursday, currentWednesday, "day", "[]");
  });

  return relevantJobs;
};