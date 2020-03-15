export const convertGameRating = (rate) => {
  const percent = (rate / 5) * 100;
  const valFromPrecent = (percent * 10) / 100;
  return +valFromPrecent.toFixed(2);
};

export const getRatingColor = (rating) => {
  const LOW = rating >= 0 && rating <= 4 ? "low" : null;
  const MEDIUM = rating > 4 && rating < 7 ? "medium" : null;
  const HIGH = rating >= 7 ? "high" : null;

  return HIGH || MEDIUM || LOW || null;
};
