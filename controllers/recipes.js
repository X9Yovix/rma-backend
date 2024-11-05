const recipesModel = require("../models/recipes");
const mongoose = require("mongoose");
const fs = require("fs");

const createRecipe = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = req.file ? req.file.path : null;
    }
    const recipe = await recipesModel.create(data);
    res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Duplicate recipe name",
        message: `A recipe with the name "${req.body.name}" already exists`,
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const recipes = await recipesModel.find().skip(skip).limit(limit);
    const totalRecipes = await recipesModel.countDocuments();

    res.status(200).json({
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: page,
      recipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await recipesModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        error: "Recipe not found",
        message: `Recipe with ID ${req.params.id} doesn't exist`,
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({
        error: "Invalid recipe ID",
        message: `The provided ID "${req.params.id}" is not a valid ObjectId`,
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const data = req.body;
    let oldImagePath = null;

    const currentRecipe = await recipesModel.findById(req.params.id);
    if (!currentRecipe) {
      return res.status(404).json({
        error: "Recipe not found",
        message: `Recipe with ID ${req.params.id} doesn't exist`,
      });
    }

    if (req.file) {
      data.image = req.file.path;
      oldImagePath = currentRecipe.image;
    } else {
      delete data.image;
    }

    const hasChanges = Object.keys(data).some((key) => {
      //console.log("data[key]: ", data[key]);
      //console.log("currentRecipe[key]: ", currentRecipe[key]);

      if (Array.isArray(data[key]) && Array.isArray(currentRecipe[key])) {
        return !arraysEqual(data[key], currentRecipe[key]);
      }

      return currentRecipe[key] !== data[key];
    });

    //console.log("hasChanges: ", hasChanges);
    if (!hasChanges) {
      return res.status(200).json({
        message: "No changes were made to the recipe",
        recipe: currentRecipe,
      });
    }

    const updatedRecipe = await recipesModel.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      },
    );

    if (oldImagePath) {
      fs.unlink(oldImagePath, (e) => {
        if (e) {
          console.error("Error deleting old image: ", e);
        }
      });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(400).json({
        error: "Invalid recipe ID",
        message: `The provided ID "${req.params.id}" is not a valid ObjectId`,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        error: "Duplicate recipe name",
        message: `A recipe with the name "${req.body.name}" already exists`,
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
