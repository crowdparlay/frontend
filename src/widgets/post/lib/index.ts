export const getTimeSince = (timestamp?: Date): string => {
  if (!timestamp) return 'unknown';

  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  const intervals = [
    {unit: 'd', seconds: 60 * 60 * 24, minUnits: 2},
    {unit: 'yesterday', seconds: 60 * 60 * 24, minUnits: 1},
    {unit: 'h', seconds: 60 * 60, minUnits: 1},
    {unit: 'm', seconds: 60, minUnits: 1},
    {unit: 's', seconds: 1, minUnits: 5},
    {unit: 'now', seconds: 1, minUnits: 0},
  ];

  for (const {unit, seconds, minUnits} of intervals) {
    const unitsAgo = Math.floor(secondsAgo / seconds);
    if (unitsAgo >= minUnits) {
      if (unit === 'yesterday' || unit === 'now') return unit;

      if (unit === 'd' && unitsAgo > 30) {
        return new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: timestamp.getFullYear() < now.getFullYear() ? 'numeric' : undefined,
        }).format(timestamp);
      }

      return `${unitsAgo}${unit} ago`;
    }
  }

  return 'in future';
};
