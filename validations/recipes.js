const joi = require("joi");

const saveRecipeSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  ingredients: joi.array().items(joi.string()).required(),
  instructions: joi.string().required(),
  image: joi.binary().optional(),
});

module.exports = {
  saveRecipeSchema,
};
