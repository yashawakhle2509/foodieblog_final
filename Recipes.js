const mongoose = require('mongoose');

// Define the schema for the Recipe model
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'default.jpg', // Provide a default image if needed
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: Array,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
        min: 1, // Ensure servings is a positive number
    },
    prepTime: {
        type: String,
        default: 'N/A', // Provide a default prepTime if needed
    },
    cookTime: {
        type: String,
        default: 'N/A', // Provide a default cookTime if needed
    },
    totalTime: {
        type: String,
        default: 'N/A', // Provide a default totalTime if needed
    },
    cuisine: {
        type: String,
        default: 'Unknown', // Provide a default cuisine if needed
    },
    tags: {
        type: [String],
        default: [], // Provide default tags if needed
    },
});

// Create the Recipe model using the schema
const Recipes = mongoose.model('Recipes', recipeSchema);

// Export the Recipe model
module.exports = Recipes;
