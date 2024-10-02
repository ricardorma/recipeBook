const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true, 
  },
  category: {
    type: String,
    required: true, 
  },
  ingredients: {
    type: [String],  
    required: true, 
  },
  instructions: {
    type: [String], 
    required: true, 
  },
  preparationTime: {
    type: Number, 
    required: true, 
  },
  image: {
    data: String, 
    contentType: String
  },
  userId: {
    type: String,
    required: true, 
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
