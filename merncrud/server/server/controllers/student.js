import mongoose from "mongoose";
import Student from "../models/student.js";

export function createStudent(req, res) {
  const student = new Student({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    class: req.body.class,
  });
  try {
    const newStudent = student.save();
    return res.status(201).json({
      success: true,
      message: "New student created successfully",
      data: newStudent,
    });
  } catch (err) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

export function getAllStudents(req, res) {
  Student.find({}, (err, students) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!students.length) {
      return res.status(404).json({ success: false, error: `Empty database` });
    }
    return res.status(200).json({ success: true, data: students });
  }).catch((err) => console.log(err));
}

export function getStudentById(req, res) {
  const id = req.params.studentId;
  Student.findById(id)
    .then((stu) =>
      res.status(200).json({
        success: true,
        message: `About ${stu.name}`,
        data: stu,
      })
    )
    .catch((error) =>
      res.status(500).json({
        success: false,
        message: "This student does not exist",
        error: error.message,
      })
    );
}

export function updateStudentById(req, res) {
  const id = req.params.studentId;
  const setStudent = req.body;
  Student.updateOne({ _id: id }, { $set: setStudent })
    .exec()
    .then(() =>
      res.status(200).json({
        success: true,
        message: "Student is updated",
        data: setStudent,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      })
    );
}

export function deleteStudentById(req, res) {
  const id = req.params.studentId;
  Student.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        error: err.message,
      })
    );
}
