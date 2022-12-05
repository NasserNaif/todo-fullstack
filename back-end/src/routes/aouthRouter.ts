import express from "express";
import { logIn, register } from "../contorlers/authControler";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../zodSchema/schemas";

const router = express.Router();

router.post(`/register`, validate(registerSchema), register);
router.post(`/login`, validate(loginSchema), logIn);


export default router;
