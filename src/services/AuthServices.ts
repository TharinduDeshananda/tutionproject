import * as crypto from "crypto";
import * as bcrypt from "bcrypt";

// Hash a user's password and return the hashed password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS ?? "10");
  return bcrypt.hash(password, saltRounds);
}

// Verify a user's password against a hashed password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
