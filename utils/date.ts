export const currentDate = () => {
  const date = new Date();
  return new Date(date.toISOString().split('T')[0]).toISOString();
};

export const nextDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return new Date(date.toISOString().split('T')[0]).toISOString();
};