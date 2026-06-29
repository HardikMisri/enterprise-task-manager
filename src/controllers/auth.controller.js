import { registerSchema } from "../validators/auth.validator.js";

export const register = (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  res.status(201).json({
    message: "User registered successfully",
    data: result.data,
  });
};