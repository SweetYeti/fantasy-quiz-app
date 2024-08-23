const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizResponseSchema = new Schema({
  name: String,
  resonantImage: String,
  zodiacSign: String,
  favoriteSeason: String,
  magicalPower: String,
  mysticalLocation: String,
  magicalFamiliar: String,
  divinationMethod: String,
  magicalSanctuary: String,
  magicalElement: String,
}, {
  timestamps: true,
});

const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema);

module.exports = QuizResponse;