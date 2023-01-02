const Parfum = require('../models/parfumModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllParfum = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Parfum.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const parfums = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: parfums.length,
    data: {
      parfums,
    },
  });
});

exports.createParfum = catchAsync(async (req, res, next) => {
  const newParfum = await Parfum.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      parfum: newParfum,
    },
  });
});

exports.updateParfum = catchAsync(async (req, res, next) => {
  const parfum = await Parfum.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!parfum) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      parfum,
    },
  });
});

exports.getParfum = catchAsync(async (req, res, next) => {
  const parfum = await Parfum.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  if (!parfum) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      parfum,
    },
  });
});

exports.deleteParfum = catchAsync(async (req, res, next) => {
  const parfum = await Parfum.findByIdAndDelete(req.params.id);
  console.log(parfum);
  if (!parfum) {
    return next(new AppError('No parfum found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
