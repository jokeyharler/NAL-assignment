export const dateDiff = (endDate: Date, startDate: Date) => {
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60)); // 1000 milliseconds * 60 seconds = 1 minute
};
