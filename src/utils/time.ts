import dayjs from 'dayjs';

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
