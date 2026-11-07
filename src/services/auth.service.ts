import { passwordMinimumLength } from "../constants/password.constant";
import { AppError } from "../errors/AppError";
import { createUser, findUesrByEmail } from "../repositories/user.repository";
import argon2 from 'argon2';

export async function registerUser(
  email: string,
  password: string,
): Promise<void> {
  if (!email || !password) {
    throw new AppError(400, "Email and Password are required");
  }

  if (passwordMinimumLength > password.length) {
    throw new AppError(400, "Password must be a 8 character long.");
  }
  const normalizeEmail = email.toLowerCase().trim();

  // find the user if its already present in db or not
  //  if yes then we will not allow to register with same email
  // again

  const existingUser = await findUesrByEmail(normalizeEmail);
  if (existingUser) {
    throw new AppError(409, " Email is already in DB");
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });
  await createUser(normalizeEmail,passwordHash)
}
