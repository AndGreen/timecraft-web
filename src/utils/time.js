import dayjs from 'dayjs';
import { default as isTodayExtension } from 'dayjs/plugin/isToday';
dayjs.extend(isTodayExtension);

export const blockDuration = 60 * 20;

export const getCurrentMinuteOfDay = () => {
  const startOfDate = dayjs().startOf('day');
  return dayjs().diff(startOfDate, 'minute');
};

export const getCurrentBlockID = () => {
  // Todo: change app times to utc with offset
  const offset = new Date().getTimezoneOffset() + 180;
  const currentMinute = getCurrentMinuteOfDay() + offset;
  return Math.floor(currentMinute / 20);
};

export const nearBlockDiff = dayjs
  .unix(Math.ceil(dayjs().unix() / blockDuration) * blockDuration)
  .diff(dayjs(), 'second');

export const createEmptyColorsArr = () => [...new Array(72)];

export const isToday = (day) => dayjs(day).isToday();
export const isPast = (day) => dayjs(day).isBefore(dayjs());
export const isFuture = (day) => dayjs(day).isAfter(dayjs());
