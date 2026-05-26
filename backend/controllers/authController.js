import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { inMemoryStore } from '../utils/inMemoryStore.js';
import bcrypt from 'bcryptjs';

// Check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// Admin emails list
const ADMIN_EMAILS = [
  'shikha@gmail.com',
  'gopichand@example.com',
  'sudhakar@example.com',
  'shubhi@example.com'
];

// Determine user role based on email
const getUserRole = (email) => {
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'student';
};

// Hash password function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Compare password function
const comparePassword = async (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

// Generate JWT Token
const generateToken = (id, role) => {
  const jwtSecret = process.env.JWT_SECRET || 'default-jwt-secret-for-development-only';
  return jwt.sign({ id, role }, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  console.log('🔥 Registration endpoint called!');
  console.log('Request body:', req.body);
  console.log('Request body keys:', Object.keys(req.body));
  
  try {
    const { name, email, password } = req.body;
    
    console.log('Extracted values:');
    console.log('  name:', name);
    console.log('  email:', email);
    console.log('  password:', password ? '***' : undefined);

    // Validation
    if (!name || !email || !password) {
      console.log('❌ Validation failed - missing fields');
      console.log('  name missing:', !name);
      console.log('  email missing:', !email);
      console.log('  password missing:', !password);
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, password)'
      });
    }

    // Auto-assign role based on email
    const role = getUserRole(email);
    console.log(`📧 Email: ${email} | Role assigned: ${role}`);

    let user;
    let existingUser;

    if (isMongoConnected()) {
      // Use MongoDB
      existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create user - password will be hashed automatically by User model pre-save hook
      user = await User.create({
        name,
        email,
        password, // Don't hash here, let the model handle it
        role
      });
    } else {
      // Use in-memory store
      existingUser = inMemoryStore.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const hashedPassword = await hashPassword(password);
      user = inMemoryStore.createUser({
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: false,
        company: '',
        position: '',
        yearOfPlacement: null
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  console.log('🔥 Login endpoint called!');
  console.log('Request body:', req.body);
  
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    console.log('📧 Looking for user with email:', email);

    let user;
    let isPasswordValid;

    if (isMongoConnected()) {
      // Use MongoDB
      user = await User.findOne({ email }).select('+password');
      console.log('👤 User found:', user ? 'YES' : 'NO');
      if (!user) {
        console.log('❌ User not found');
        return res.status(401).json({
          success: false,
          message: 'No account found with this email address.'
        });
      }

      console.log('🔐 Comparing passwords...');
      console.log('Input password:', password);
      console.log('Stored password hash:', user.password);
      isPasswordValid = await user.comparePassword(password);
      console.log('🔐 Password valid:', isPasswordValid);
    } else {
      // Use in-memory store
      console.log('Using in-memory store');
      user = inMemoryStore.findUserByEmail(email);
      console.log('👤 User found in memory:', user ? 'YES' : 'NO');
      if (!user) {
        console.log('❌ User not found in memory');
        return res.status(401).json({
          success: false,
          message: 'No account found with this email address.'
        });
      }

      console.log('🔐 Comparing passwords (in-memory)...');
      console.log('Input password:', password);
      console.log('Stored password hash:', user.password);
      isPasswordValid = await comparePassword(password, user.password);
      console.log('🔐 Password valid (in-memory):', isPasswordValid);
    }

    console.log('Final password validation result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Password validation failed - returning error');
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect. Please try again.'
      });
    }

    console.log('✅ Login successful - generating token');

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    let user;

    if (isMongoConnected()) {
      user = await User.findById(req.user.id);
    } else {
      user = inMemoryStore.findUserById(req.user.id);
    }
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        company: user.company,
        position: user.position,
        yearOfPlacement: user.yearOfPlacement
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};