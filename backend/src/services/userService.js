import prisma from "../utils/prisma.js";
import { isValidRole, ROLES } from "../constants/roles.js";

export const listUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
};

export const updateUser = async (targetUserId, updates, actorUserId) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: targetUserId },
  });
  if (!currentUser) {
    throw new Error("User not found");
  }

  const nextData = {};

  if (typeof updates.role !== "undefined") {
    if (!isValidRole(updates.role)) {
      throw new Error("Invalid role");
    }
    if (updates.role === ROLES.ADMIN && currentUser.role !== ROLES.ADMIN) {
      const activeAdminCount = await prisma.user.count({
        where: { role: ROLES.ADMIN, isActive: true },
      });
      if (activeAdminCount > 0) {
        throw new Error("Only one active admin is allowed");
      }
    }
    if (
      currentUser.role === ROLES.ADMIN &&
      updates.role !== ROLES.ADMIN &&
      currentUser.isActive
    ) {
      throw new Error("Cannot change role of the only active admin");
    }
    nextData.role = updates.role;
  }

  if (typeof updates.isActive !== "undefined") {
    if (typeof updates.isActive !== "boolean") {
      throw new Error("isActive must be boolean");
    }
    if (currentUser.id === actorUserId && updates.isActive === false) {
      throw new Error("Admin cannot deactivate their own account");
    }
    if (
      currentUser.role === ROLES.ADMIN &&
      currentUser.isActive &&
      updates.isActive === false
    ) {
      throw new Error("Cannot deactivate the only active admin");
    }
    nextData.isActive = updates.isActive;
  }

  if (Object.keys(nextData).length === 0) {
    throw new Error("No valid updates provided");
  }

  const updated = await prisma.user.update({
    where: { id: targetUserId },
    data: nextData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return updated;
};

