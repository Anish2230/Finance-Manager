import * as dashboardService from "../services/dashboardService.js";
import prisma from "../utils/prisma.js";

export const getDashboardData = async (req, res) => {
  try {
    const data = await dashboardService.getDashboard();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    // Total Income
    const income = await prisma.record.aggregate({
      where: { type: "INCOME" },
      _sum: { amount: true },
    });

    // Total Expenses
    const expenses = await prisma.record.aggregate({
      where: { type: "EXPENSE" },
      _sum: { amount: true },
    });

    const totalIncome = income._sum.amount || 0;
    const totalExpenses = expenses._sum.amount || 0;

    res.json({
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
    });
  } catch (error) {
  console.log("DASHBOARD ERROR:", error); // 👈 IMPORTANT
  res.status(500).json({ message: "Error fetching dashboard" });
}
};