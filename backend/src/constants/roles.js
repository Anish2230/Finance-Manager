export const ROLES = {
  VIEWER: "VIEWER",
  ANALYST: "ANALYST",
  ADMIN: "ADMIN",
};

export function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}

