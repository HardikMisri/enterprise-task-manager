import { db } from "../db/index.js";
import { users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    throw new Error("Email already exists");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const [newUser] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    });

  return newUser;
};

export const loginUser = async (userData) => {
  const { email, password } = userData;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
