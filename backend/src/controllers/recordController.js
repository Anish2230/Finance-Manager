import * as recordService from "../services/recordService.js";
import prisma from "../utils/prisma.js";
import {
  isValidCategoryForType,
  normalizeCategory,
  normalizeRecordType,
} from "../constants/recordCategories.js";

export const create = async (req, res) => {
  console.log("CREATE CONTROLLER HIT");
  console.log("REQ BODY:", req.body);
  console.log("REQ USER:", req.user);
  try {
    const record = await recordService.createRecord(
      req.body,
      req.user.id
    );
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const records = await recordService.getRecords(req.query);
    res.json(records);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.record.deleteMany({
      where: { id },
    });
    if (result.count === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Error deleting record" });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, note } = req.body;

    const normalizedType = normalizeRecordType(type);
    if (!normalizedType) {
      return res
        .status(400)
        .json({ message: "Invalid record type. Use INCOME or EXPENSE." });
    }
    if (!isValidCategoryForType(normalizedType, category)) {
      return res.status(400).json({
        message: `Invalid category for ${normalizedType}. Please select a valid category.`,
      });
    }
    const normalizedCategory = normalizeCategory(category);

    const updateResult = await prisma.record.updateMany({
      where: { id },
      data: {
        amount: Number(amount),
        type: normalizedType,
        category: normalizedCategory,
        note,
      },
    });

    if (updateResult.count === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    const updated = await prisma.record.findUnique({ where: { id } });
    res.json(updated);
  } catch (error) {
        console.log("UPDATE ERROR:", error); // 👈 IMPORTANT
        res.status(500).json({ message: "Error updating record" });
    }
};