const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const dashboardService = require('../services/dashboardService');

const getSummary = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardSummary();
  res.status(200).json(new ApiResponse(200, data, 'Dashboard metrics fetched successfully'));
});

module.exports = { getSummary };
