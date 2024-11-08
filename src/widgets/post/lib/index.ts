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

export const isEmoji = (text: string) =>
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]).?$/.test(
    text,
  );
