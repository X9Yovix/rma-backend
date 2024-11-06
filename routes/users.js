const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const authorization = require("../middlewares/authorization");

/**
 * @swagger
 * /users/seed:
 *   post:
 *     summary: Seed a default user
 *     description: Seed a default user to the database for testing purposes
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User seeded successfully
 *       500:
 *         description: Internal server error
 */
router.post("/seed", userController.seedUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user and return an access and refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@test.com"
 *               password:
 *                 type: string
 *                 example: "test@test.com"
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid password"
 *                 message:
 *                   type: string
 *                   example: "The password you've entered is incorrect"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *                 message:
 *                   type: string
 *                   example: "User with email 'test@test.com' doesn't exist"
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
router.post("/login", userController.login);

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: Refresh the JWT access token using a refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       403:
 *         description: Forbidden - Force user to login again
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden"
 *                 message:
 *                   type: string
 *                   example: "Refresh Token is expired"
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
router.post("/refresh", userController.refreshToken);

router.get("/verify", authorization, (req, res) => {
  res.status(200).send({ message: "Token is valid" });
});

module.exports = router;
