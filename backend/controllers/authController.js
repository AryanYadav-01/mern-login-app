// const bcrypt = require("bcryptjs"); 
const User = require("../models/User");

// @route  POST /api/auth/register
// @desc   Create a new user, save to MongoDB, then the frontend
//         redirects to the login page.
const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username or email already in use." });
    }

              // const salt = await bcrypt.genSalt(10);
              // const hashedPassword = await bcrypt.hash(password, salt);

              // const newUser = new User({
              //   fullName,
              //   username: username.toLowerCase(),
              //   email: email.toLowerCase(),
              //   password: hashedPassword,
              // });

    const newUser = new User({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });

    await newUser.save();
    const saved = await newUser.save();
console.log("User saved with _id:", saved._id);

    return res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while registering user." });
  }
};

// @route  POST /api/auth/login
// @desc   Check username/email + password against MongoDB.
//         No JWT/sessions — just a simple success/fail response.
//         The frontend redirects to the home page on success.
const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = username or email

    if (!identifier || !password) {
      return res.status(400).json({ message: "Username/email and password are required." });
    }

    const user = await User.findOne({
      $or: [{ username: identifier.toLowerCase() }, { email: identifier.toLowerCase() }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while logging in." });
  }
};

module.exports = { registerUser, loginUser };
