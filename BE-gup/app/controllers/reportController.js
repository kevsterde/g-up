const sharp = require('sharp')
const multer = require('multer')
const { promisify } = require('util')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Report = require('../models/reportModel')
const AppError = require('../utils/appError')
const catchAsyncErrors = require('../utils/catchAsyncErrors')

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false)
  }
}

const uploadProfile = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadReportImages = uploadProfile.fields([{ name: 'gallery' }])
exports.resizeReportImages = catchAsyncErrors(async (req, res, next) => {
  if (!req.files) return next()

  // create file names
  const fileNames = req.files.gallery.map(
    (file, i) => (file.filename = `user-${req.user.id}-${Date.now()}-${i + 1}.jpeg`),
  )
  req.filenames = fileNames
  const galleryFileNames = req.filenames

  // upload images
  await req.files.gallery.forEach(async file => {
    await sharp(file.buffer).toFormat('jpeg').toFile(`app/uploads/images/reports/${file.filename}`)
  })

  res.status(201).json({
    status: 'success',
    images: galleryFileNames,
  })
})

exports.createReport = catchAsyncErrors(async (req, res, next) => {
  const report = await Report.create(req.body)
  res.status(201).json({
    message: 'success',
    report,
  })
})

exports.getAllReport = catchAsyncErrors(async (req, res, next) => {
  let reports, token, user

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (token) {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    user = await User.findById(decoded.id)
  }
  // let reports = await Report.find({ status: 'approved' })
  console.log('Role: ' + user?.role)
  if (user?.role === 'admin') {
    reports = await Report.find()
  } else {
    reports = await Report.find({ status: 'approved' })
  }

  // const reports = await Report.find()
  res.status(200).json({
    message: 'success',
    results: reports.length,
    data: reports,
  })
})

exports.updateReportStatus = catchAsyncErrors(async (req, res, next) => {
  const { reportId, status } = req.query
  const report = await Report.findByIdAndUpdate(
    reportId,
    { status },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!report) {
    next(new AppError('No Report found by that report ID', 404))
  }

  res.status(200).json({
    message: 'success',
    report,
  })
})
