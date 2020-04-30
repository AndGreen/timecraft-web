import dayjs, { Dayjs } from 'dayjs';
import { default as isTodayExtension } from 'dayjs/plugin/isToday';
dayjs.extend(isTodayExtension);

export const blockDuration = 60 * 20;

export const getCurrentMinuteOfDay = () => {
  const startOfDate = dayjs().startOf('day');
  return dayjs().diff(startOfDate, 'minute');
};

export const getCurrentBlockID = () => {
  const currentMinute = getCurrentMinuteOfDay();
  return Math.floor(currentMinute / 20);
};

export const nearBlockDiff = dayjs
  .unix(Math.ceil(dayjs().unix() / blockDuration) * blockDuration)
  .diff(dayjs(), 'second');

export const createEmptyColorsArr = () => [...new Array<string>(72)];

export const isToday = (day: string) => dayjs(day).isToday();
export const isPast = (day: string) => dayjs(day).isBefore(dayjs());
export const isFuture = (day: string) => dayjs(day).isAfter(dayjs());
