const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const validation = require("../middlewares/validation");
const { saveRecipeSchema } = require("../validations/recipes");
const upload = require("../middlewares/image_storage");

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the recipe
 *                 example: recipe1
 *               description:
 *                 type: string
 *                 description: Description of the recipe
 *                 example: This is a recipe1
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *                 example: ["ingredient1", "ingredient2"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions
 *                 example: Cook the ingredients
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: An image file for the recipe
 *             required:
 *               - name
 *               - description
 *               - ingredients
 *               - instructions
 *           encoding:
 *             ingredients:
 *               style: form
 *               explode: true
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe created successfully
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: recipe1
 *                     description:
 *                       type: string
 *                       example: This is a recipe1
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["ingredient1", "ingredient2"]
 *                     instructions:
 *                       type: string
 *                       example: Cook the ingredients
 *                     image:
 *                       type: string
 *                       example: /path/image.ext
 *       409:
 *         description: Duplicate recipe name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Duplicate recipe name
 *                 message:
 *                   type: string
 *                   example: A recipe with the name "recipe1" already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post(
  "/",
  upload.single("image"),
  validation(saveRecipeSchema),
  recipesController.createRecipe,
);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: List of recipes using pagination
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number (default is 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of recipes to be returned per page (default is 5)
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: A list of recipes with pagination details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRecipes:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 recipes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: recipe1
 *                       description:
 *                         type: string
 *                         example: This is a recipe1
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["ingredient1", "ingredient2"]
 *                       instructions:
 *                         type: string
 *                         example: Cook the ingredients
 *                       image:
 *                         type: string
 *                         example: /path/image.ext
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/", recipesController.getRecipes);

module.exports = router;
