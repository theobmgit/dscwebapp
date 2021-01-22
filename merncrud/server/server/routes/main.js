import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/student.js";

const router = express.Router();
router.post("/student", createStudent);
router.get("/student", getAllStudents);
router.get("/student/:studentId", getStudentById);
router.put("/student/:studentId", updateStudentById);
router.delete("/student/:studentId", deleteStudentById);

export default router;
