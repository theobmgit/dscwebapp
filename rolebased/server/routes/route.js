import { Router } from "express";
const router = Router();
import { allowIfLoggedin, grantAccess } from "../controllers/access";
import {
  getUserById,
  getAllUsers,
  updateUserById,
} from "../controllers/adminOperation";
import {
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
} from "../controllers/userOperation";
import { signup, login } from "../controllers/userValidate";

router.post("/auth/admin/login", login);

router.get("/api/v1/user/:userId", allowIfLoggedin, getUserById);

router.get(
  "/api/v1/user",
  allowIfLoggedin,
  grantAccess("readAny", "user"),
  getAllUsers
);

router.put(
  "/api/v1/user/:userId",
  allowIfLoggedin,
  grantAccess("updateAny", "user"),
  updateUserById
);

export default router;
