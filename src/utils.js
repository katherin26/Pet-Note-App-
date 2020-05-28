export function convertTimestampToDate(timestamp) {
  try {
    const date = new Date(Number.parseInt(timestamp) * 1000);
    return date.toLocaleDateString();
  } catch (e) {
    return "";
  }
}

export function convertTimestampToISODate(timestamp) {
  try {
    const date = new Date(Number.parseInt(timestamp) * 1000);
    return date.toISOString().substr(0, 10);
  } catch (e) {
    return "";
  }
}

export function convertDateToTimestamp(dt) {
  if (!dt) return;
  try {
    const date = new Date(dt);
    date.setUTCHours(12);
    return Math.round(date.getTime() / 1000);
  } catch {
    return;
  }
}
