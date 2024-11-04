const recipesModel = require("../models/recipes");

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

module.exports = {
  createRecipe,
};
