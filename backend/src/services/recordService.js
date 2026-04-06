import prisma from "../utils/prisma.js";
import {
  isValidCategoryForType,
  normalizeCategory,
  normalizeRecordType,
} from "../constants/recordCategories.js";

export const createRecord = async (data, userId) => {
  const { amount, type, category, date, note } = data;

  if (!amount || !type || !category) {
    throw new Error("Missing required fields");
  }
  console.log("RECEIVED DATA:", { amount, type, category });
  console.log("NORMALIZED TYPE:", normalizeRecordType(type));
  console.log("NORMALIZED CATEGORY:", normalizeCategory(category));
  console.log("IS VALID:", isValidCategoryForType(type, category));

  if (!amount || !type || !category) {
    throw new Error("Missing required fields");
  }

  const normalizedType = normalizeRecordType(type);
  if (!normalizedType) {
    throw new Error("Invalid record type. Use INCOME or EXPENSE.");
  }
  if (!isValidCategoryForType(normalizedType, category)) {
    throw new Error(
      `Invalid category for ${normalizedType}. Please select a valid category.`
    );
  }
  const normalizedCategory = normalizeCategory(category);
  return await prisma.record.create({
    data: {
      amount,
      type: normalizedType,
      category: normalizedCategory,
      date: date ? new Date(date) : new Date(),
      note,
      userId,
    },
  });
};

export const getRecords = async (filters = {}) => {
  const where = {};

  if (filters.type) {
    const normalizedType = normalizeRecordType(filters.type);
    if (!normalizedType) {
      throw new Error("Invalid record type filter");
    }
    where.type = normalizedType;
  }

  if (filters.category) {
    const normalizedCategory = normalizeCategory(filters.category);
    if (!normalizedCategory) {
      throw new Error("Invalid category filter");
    }
    where.category = normalizedCategory;
  }

  if (filters.startDate || filters.endDate) {
    where.date = {};
    if (filters.startDate) where.date.gte = new Date(filters.startDate);
    if (filters.endDate) where.date.lte = new Date(filters.endDate);
  }

  return await prisma.record.findMany({
    where,
    orderBy: { date: "desc" },
  });
};

