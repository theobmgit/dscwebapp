import User from "../models/user.js";

export async function getAllUsers(res) {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `Empty database` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
}

export async function getUserById(req, res) {
  const id = req.params.userId;
  User.findById(id)
    .then((user) =>
      res.status(200).json({
        success: true,
        message: `About ${user.username}`,
        data: user,
      })
    )
    .catch((error) =>
      res.status(500).json({
        success: false,
        message: "User does not exist",
        error: error.message,
      })
    );
}

export async function updateUserById(req, res, next) {
  const id = req.params.userId;
  const update = req.body;
  User.updateOne({ _id: id }, { $set: { status: update.status } })
    .exec()
    .then(() =>
      res.status(200).json({
        success: true,
        message:
          update.status === "active"
            ? "User has been reactivated"
            : "User has been banned",
        data: update,
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

export async function deleteUserById(req, res, next) {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
}
