const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizResponseSchema = new Schema({
  name: String,
  age: Number,
  zodiacSign: String,
  favouriteColour: String,
  magicalSetting: String,
  magicalSettingReason: String,
  favouriteSeason: String,
  favouriteTimeOfDay: String,
  joyAndFulfilment: String,
  magicalPower: String,
  fictionalWorld: String,
  magicalFamiliar: String,
  magicalFamiliarReason: String,
  divinationMethod: String,
  recurringChallenge: String,
  lifePurpose: String,
  wisdomToYoungerSelf: String,
  lifeBookChapter: String,
  greatestStrength: String,
  hiddenSelf: String,
  magicalElement: String,
  hobbies: String,
}, {
  timestamps: true,
});

const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema);

module.exports = QuizResponse;