import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

exports.register = async (req, res) => {
  try {
    const { email, password, username, fullName } = req.body;

    //check if the user exists
    const userExists = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists',
      });
    }

    // create user
    const user = await UserModel.create({
      email,
      password,
      username,
      fullName,
    });

    //Generate jwt token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  // @desc    Login user
  // @route   POST /api/auth/login
  // @access  Public

  exports.Login = async (req, res) => {
    try {
      const { email, password } = req.body;

      //validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password',
        });
      }

      // Find user (include password field)
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'invalid credentials',
        });
      }

      // Check password
      const isPasswordCorrect = user.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(404).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // generate token
      const token = generateToken(user._id);

      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          profilePicture: user.profilePicture,
          bio: user.bio,
          title: user.title,
          skills: user.skills,
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // @desc    Get current user
    // @route   GET /api/auth/me
    // @access  Private

    exports.getMe = async (req, res) => {
      try {
        const user = await UserModel.findById(req.user.id);
        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  };
};
