import dayjs from "dayjs";

export const getLastXDate = (x: number, unit: dayjs.ManipulateType): string => {
  return dayjs().subtract(x, unit).toISOString();
};

export const TIME_PERIODS = [
  {
    label: "Last 30 days",
    value: getLastXDate(30, "day"),
  },
  {
    label: "Last 60 days",
    value: getLastXDate(60, "day"),
  },
  {
    label: "Last 90 days",
    value: getLastXDate(90, "day"),
  },
  {
    label: "Last 6 months",
    value: getLastXDate(6, "month"),
  },
  {
    label: "Last 1 year",
    value: getLastXDate(1, "year"),
  },
];
