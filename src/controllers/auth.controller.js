import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  try {
    const user = await registerUser(result.data);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

import { loginSchema } from "../validators/auth.validator.js";
import { loginUser } from "../services/auth.service.js";

export const login = async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  try {
    const data = await loginUser(result.data);

    return res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};