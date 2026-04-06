import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { isValidRole, ROLES } from "../constants/roles.js";

export const registerUser = async (data) => {
  const { name, email, password, role } = data;
  
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const requestedRole = role || ROLES.VIEWER;
  if (!isValidRole(requestedRole)) {
    throw new Error("Invalid role");
  }

  if (requestedRole === ROLES.ADMIN) {
    const adminCount = await prisma.user.count({
      where: { role: ROLES.ADMIN, isActive: true },
    });
    if (adminCount > 0) {
      throw new Error("Only one active admin is allowed");
    }
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: requestedRole,
    },
  });

  const token = generateToken(user);

  return { user, token };
};

export const loginUser = async (data) => {
  const { email, password } = data;
  
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }
  if (!user.isActive) {
    throw new Error("Account is inactive");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return { user, token };
};