import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';

dayjs.extend(relativeTime);

export function getCurrentDatetime() {
  return dayjs().format(DATETIME_FORMAT);
}

export function formatDate(datetime: string | Date) {
  return dayjs(datetime).format(DATE_FORMAT);
}

export function formatDatetime(datetime: string | Date) {
  return dayjs(datetime).format(DATETIME_FORMAT);
}

export function showRelativeTime(datetime: string | Date) {
  return dayjs(datetime).fromNow();
}