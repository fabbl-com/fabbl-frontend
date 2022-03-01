const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

export const formatTime = (date) => {
  const old = new Date(date);
  const now = new Date();

  const val = (now - old) / (1000 * 60 * 60 * 24);

  if (val <= 1) return { label: true, value: "TODAY" };
  else if (val > 1 && val <= 2) return { label: true, value: "YESTERDAY" };
  else
    return {
      label: true,
      value: `${old.getDate()} ${months[old.getMonth() - 1]} ${old.getFullYear()}`
    };
};
