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
 *                 example: "recipe1"
 *               description:
 *                 type: string
 *                 description: Description of the recipe
 *                 example: "This is a recipe1"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *                 example: ["ingredient1", "ingredient2"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions
 *                 example: "Cook the ingredients"
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
 *                   example: "Recipe created successfully"
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "1234567890abcdef"
 *                     name:
 *                       type: string
 *                       example: "recipe1"
 *                     description:
 *                       type: string
 *                       example: "This is a recipe1"
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["ingredient1", "ingredient2"]
 *                     instructions:
 *                       type: string
 *                       example: "Cook the ingredients"
 *                     image:
 *                       type: string
 *                       example: "/path/image.ext"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       409:
 *         description: Duplicate recipe name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Duplicate recipe name"
 *                 message:
 *                   type: string
 *                   example: "A recipe with the name 'recipe1' already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
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
 *     summary: Retrieve a list of all recipes
 *     description: List of recipes using pagination
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
 *                       _id:
 *                         type: string
 *                         example: "1234567890abcdef"
 *                       name:
 *                         type: string
 *                         example: "recipe1"
 *                       description:
 *                         type: string
 *                         example: "This is a recipe1"
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
 *                         example: "/path/image.ext"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/", recipesController.getRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Retrieve a specific recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1234567890abcdef"
 *                 name:
 *                   type: string
 *                   example: "recipe1"
 *                 description:
 *                   type: string
 *                   example: "This is a recipe1"
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["ingredient1", "ingredient2"]
 *                 instructions:
 *                   type: string
 *                   example: "Cook the ingredients"
 *                 image:
 *                   type: string
 *                   example: "/path/image.ext"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T00:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T00:00:00.000Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Invalid recipe ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid recipe ID"
 *                 message:
 *                   type: string
 *                   example: "The provided ID '1234567890abcdefsfsdfdsfd' is not a valid ObjectId"
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Recipe not found"
 *                 message:
 *                   type: string
 *                   example: "Recipe with ID '1234567890abcdef' doesn't exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/:id", recipesController.getRecipeById);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a specific recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to update
 *         schema:
 *           type: string
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
 *                 example: "Updated recipe1"
 *               description:
 *                 type: string
 *                 description: Description of the recipe
 *                 example: "Updated recipe1 description"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *                 example: ["updated ingredient1", "updated ingredient2"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions
 *                 example: "Updated cooking instructions"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: An updated image file for the recipe
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
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recipe updated successfully"
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "1234567890abcdef"
 *                     name:
 *                       type: string
 *                       example: "Updated recipe1"
 *                     description:
 *                       type: string
 *                       example: "Updated recipe1 description"
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["updated ingredient1", "updated ingredient2"]
 *                     instructions:
 *                       type: string
 *                       example: "Updated cooking instructions"
 *                     image:
 *                       type: string
 *                       example: "/path/new_image.ext"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       204:
 *         description: No changes were made to the recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No changes were made to the recipe"
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "1234567890abcdef"
 *                     name:
 *                       type: string
 *                       example: "Updated recipe1"
 *                     description:
 *                       type: string
 *                       example: "Updated recipe1 description"
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["updated ingredient1", "updated ingredient2"]
 *                     instructions:
 *                       type: string
 *                       example: "Updated cooking instructions"
 *                     image:
 *                       type: string
 *                       example: "/path/new_image.ext"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid recipe ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid recipe ID"
 *                 message:
 *                   type: string
 *                   example: "The provided ID '1234567890abcdefsfsdfdsfd' is not a valid ObjectId"
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Recipe not found"
 *                 message:
 *                   type: string
 *                   example: "Recipe with ID '1234567890abcdef' doesn't exist"
 *       409:
 *         description: Duplicate recipe name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Duplicate recipe name"
 *                 message:
 *                   type: string
 *                   example: "A recipe with the name 'Updated recipe1' already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put("/:id", upload.single("image"), recipesController.updateRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a specific recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recipe deleted successfully"
 *       400:
 *         description: Invalid recipe ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid recipe ID"
 *                 message:
 *                   type: string
 *                   example: "The provided ID '1234567890abcdefsfsdfdsfd' is not a valid ObjectId"
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Recipe not found"
 *                 message:
 *                   type: string
 *                   example: "Recipe with ID '1234567890abcdef' doesn't exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/:id", recipesController.deleteRecipe);

/**
 * @swagger
 * /recipes/advanced/search:
 *   get:
 *     summary: Search for recipes by name and ingredients
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Name of the recipe to search for
 *         schema:
 *           type: string
 *         example: "rec"
 *       - in: query
 *         name: ingredients
 *         required: false
 *         description: Comma-separated list of ingredients to search for
 *         schema:
 *           type: string
 *         example: "ingredient1, ingredient2"
 *     responses:
 *       200:
 *         description: Recipes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "1234567890abcdef"
 *                       name:
 *                         type: string
 *                         example: "recipe1"
 *                       description:
 *                         type: string
 *                         example: "This is a recipe1"
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["ingredient1", "ingredient2"]
 *                       instructions:
 *                         type: string
 *                         example: "Cook the ingredients"
 *                       image:
 *                         type: string
 *                         example: "/path/image.ext"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *       404:
 *         description: No recipes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No recipes found"
 *                 message:
 *                   type: string
 *                   example: "No recipes found with the provided search criteria"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/advanced/search", recipesController.searchRecipes);

module.exports = router;
