const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "root";

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new Admin({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "admin",
    });
    const result = await admin.save();
    res.status(201).json(result);
  } catch (error) {
    console.log("Error creating admin: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const result = await bcrypt.compare(req.body.password, admin.password);
    if (!result) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign(
      {
        email: admin.email,
        userId: admin._id,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    return res
      .status(200)
      .json({ message: "Authentication successful", token: token });
  } catch (error) {
    console.log("Error logging in admin: ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
