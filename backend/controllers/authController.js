const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, 'User profile retrieved successfully'));
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePasswordUser(req.user._id, currentPassword, newPassword);
  res.status(200).json(new ApiResponse(200, result, 'Password changed successfully'));
});

module.exports = { register, login, getProfile, changePassword };
