const usersModel = require("../models/users");
const jwt = require("jsonwebtoken");

const seedUser = async (_, res) => {
  try {
    const user = new usersModel({
      _id: "123456123456123456123456",
      name: "testuser",
      email: "test@test.com",
      password: "test@test.com",
    });
    await user.save();

    res.status(201).json({
      message: "User seeded successfully",
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "User already exists",
        message: `User with id '123456123456123456123456' already exists`,
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: `User with email "${email}" doesn't exist`,
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        error: "Invalid password",
        message: "The password you've entered is incorrect",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).send({
        error: "Unauthorized",
        message: "Refresh Token is required",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

    const accessToken = jwt.sign(
      { id: decoded._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      },
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).send({
        error: "Forbidden",
        message: "Refresh Token is expired",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  seedUser,
  login,
  refreshToken,
};
