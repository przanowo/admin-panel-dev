const mongoose = require('mongoose');

const parfumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A parfum must have a name'],
    unique: true,
    trim: true,
    maxlength: [30, 'A parfum name must have less or equal then 30 characters'],
    minlength: [5, 'A parfum name must have more or equal then 5 characters'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  price: {
    type: Number,
    required: [true, 'A parfum must have a price'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [
      200,
      'A parfum name must have less or equal then 200 characters',
    ],
    minlength: [5, 'A parfum name must have more or equal then 5 characters'],
  },
  brand: {
    type: String,
    required: [true, 'A parfum must have a brand'],
  },
  model: {
    type: String,
    required: [true, 'A parfum must have a model'],
  },
  quantity: {
    type: String,
    required: [true, 'Parfum must have quantity'],
  },
  sex: {
    type: String,
    required: [true, 'A parfum must have a sex'],
  },
  // mini vintage
  category: {
    type: String,
    required: [true, 'A parfum must have a category'],
  },
  //edp edt parfum
  type: {
    type: String,
  },
  // allapot
  condition: {
    type: String,
  },
  year: {
    type: Number,
  },
  visible: {
    type: String,
  },
  // imageCover: {
  //   type: String,
  //   required: [true, 'A parfum must have an image'],
  // },
  // image: [String],
});

const Parfum = mongoose.model('parfums', parfumSchema);

module.exports = Parfum;
