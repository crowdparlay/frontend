import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmoji = (text: string) =>
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]).?$/.test(
    text,
  );

export const format = (timestamp: string | Date, locale?: string) => {
  if (!(timestamp instanceof Date)) timestamp = new Date(timestamp);
  locale = locale ?? navigator.language ?? 'en-GB';

  const offset = -timestamp.getTimezoneOffset();
  const offsetSign = offset >= 0 ? '+' : '-';
  const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
  const offsetHours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, '0');

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const clientDate = new Date(timestamp.getTime() + offset * 60000);
  const formattedDate = dateFormatter.format(clientDate);
  const formattedTime = timeFormatter.format(clientDate);
  const formattedOffset = `UTC${offsetSign}${offsetHours}:${offsetMinutes}`;

  return `${formattedDate} at ${formattedTime} ${formattedOffset}`;
};

export const getTimeSince = (timestamp: string | Date): string => {
  if (!(timestamp instanceof Date)) timestamp = new Date(timestamp);

  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  const intervals = [
    {unit: 'day', seconds: 60 * 60 * 24, minUnits: 2},
    {unit: 'yesterday', seconds: 60 * 60 * 24, minUnits: 1},
    {unit: 'hour', seconds: 60 * 60, minUnits: 1},
    {unit: 'minute', seconds: 60, minUnits: 1},
    {unit: 'second', seconds: 1, minUnits: 5},
    {unit: 'now', seconds: 1, minUnits: -5},
  ];

  for (const {unit, seconds, minUnits} of intervals) {
    const unitsAgo = Math.floor(secondsAgo / seconds);
    if (unitsAgo >= minUnits) {
      if (unit === 'now') return unit;

      if (unit === 'yesterday') {
        const time = new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(timestamp);
        return `${unit} at ${time}`;
      }

      if (unit === 'day' && unitsAgo > 30) {
        const monthAndDay = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
        }).format(timestamp);

        const year =
          timestamp.getFullYear() < now.getFullYear() ? ` of ${timestamp.getFullYear()}` : '';

        return monthAndDay + year;
      }

      const s = unitsAgo > 1 ? 's' : '';
      return `${unitsAgo} ${unit}${s} ago`;
    }
  }

  return 'in future';
};

export const hash = (input: string) => {
  let hash = 0,
    i,
    chr;
  if (input.length === 0) return hash;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};
