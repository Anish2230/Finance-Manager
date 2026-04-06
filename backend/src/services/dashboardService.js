import prisma from "../utils/prisma.js";

export const getDashboard = async () => {
  const records = await prisma.record.findMany();

  let totalIncome = 0;
  let totalExpense = 0;
  let categoryMap = {};

  records.forEach((r) => {
    if (r.type === "INCOME") totalIncome += r.amount;
    else totalExpense += r.amount;

    categoryMap[r.category] =
      (categoryMap[r.category] || 0) + r.amount;
  });

  const categoryBreakdown = Object.entries(categoryMap).map(
    ([category, total]) => ({ category, total })
  );

  const monthlyMap = {};
  records.forEach((r) => {
    const month = new Date(r.date).toISOString().slice(0, 7);
    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expense: 0 };
    }
    if (r.type === "INCOME") monthlyMap[month].income += r.amount;
    else monthlyMap[month].expense += r.amount;
  });
  const monthlyTrend = Object.values(monthlyMap).sort((a, b) =>
    a.month.localeCompare(b.month)
  );

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categoryBreakdown,
    monthlyTrend,
  };
};