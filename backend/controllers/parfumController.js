const multer = require('multer');
const sharp = require('sharp');
const Parfum = require('../models/parfumModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    //console.log(file.mimetype);
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadParfumImages = upload.single('imageCover');

exports.resizeParfumImages = catchAsync(async (req, res, next) => {
  console.log('resizeParfumImages', req.file);
  if (!req.file) return next();

  req.file.filename = `parfum-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/parfums/${req.file.filename}`);

  next();
});

// exports.uploadParfumImages = upload.fields([
//   { name: 'imageCover', maxCount: 1 },
//   { name: 'images', maxCount: 5 },
// ]);

// // upload.single('image') req.file
// // upload.array('images', 5) req.files

// exports.resizeParfumImages = catchAsync(async (req, res, next) => {
//   if (!req.files.imageCover || !req.files.images) return next();

//   // 1) Cover image
//   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/parfums/${req.body.imageCover}`);

//   // 2) Images
//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/parfums/${filename}`);

//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

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

exports.createParfum = catchAsync(async (req, res, next) => {
  const newParfum = await Parfum.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      parfum: newParfum,
    },
  });
});

// exports.createParfum = factory.createOne(Parfum);
