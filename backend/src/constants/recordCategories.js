export const EXPENSE_CATEGORIES = [
  "SALARIES",
  "ESOPS",
  "GRATUITY",
  "INFRASTRUCTURE",
  "SOFTWARE_LICENSES",
  "MARKETING",
  "OPERATIONS",
  "LEGAL_COMPLIANCE",
  "R_AND_D",
  "OFFICE_RENT",
  "EQUIPMENT",
  "MISCELLANEOUS",
];

export const INCOME_CATEGORIES = [
  "USER_SUBSCRIPTIONS",
  "ENTERPRISE_CONTRACTS",
  "EQUITY_INVESTMENT",
  "ANGEL_FUNDING",
  "VENTURE_CAPITAL",
  "AD_REVENUE",
  "API_LICENSING",
  "GRANTS",
  "MISCELLANEOUS",
];

export const CATEGORY_LABELS = {
  // EXPENSE
  SALARIES: "Salaries",
  ESOPS: "ESOPs",
  GRATUITY: "Gratuity",
  INFRASTRUCTURE: "Infrastructure",
  SOFTWARE_LICENSES: "Software Licenses",
  MARKETING: "Marketing",
  OPERATIONS: "Operations",
  LEGAL_COMPLIANCE: "Legal & Compliance",
  R_AND_D: "R&D",
  OFFICE_RENT: "Office Rent",
  EQUIPMENT: "Equipment",
  MISCELLANEOUS: "Miscellaneous",
  // INCOME
  USER_SUBSCRIPTIONS: "User Subscriptions",
  ENTERPRISE_CONTRACTS: "Enterprise Contracts",
  EQUITY_INVESTMENT: "Equity Investment",
  ANGEL_FUNDING: "Angel Funding",
  VENTURE_CAPITAL: "Venture Capital",
  AD_REVENUE: "Ad Revenue",
  API_LICENSING: "API Licensing",
  GRANTS: "Grants",
};

export function normalizeRecordType(type) {
  if (typeof type !== "string") return null;
  const normalized = type.trim().toUpperCase();
  if (normalized !== "INCOME" && normalized !== "EXPENSE") return null;
  return normalized;
}

export function normalizeCategory(category) {
  if (typeof category !== "string") return null;
  const normalized = category.trim().toUpperCase();
  return CATEGORY_LABELS[normalized] ? normalized : null;
}

export function isValidCategoryForType(type, category) {
  const normalizedType = normalizeRecordType(type);
  const normalizedCategory = normalizeCategory(category);
  if (!normalizedType) return false;
  if (!normalizedCategory) return false;

  const list =
    normalizedType === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return list.includes(normalizedCategory);
}

