import express, { Router } from 'express'
import {
  RegisterUser,
  LoginUser,
  GetAllUsers,
  GetCurrentUser,
  Logout,
} from '../controllers/authController'
import { verifyToken } from '../middleware/authMiddleware'
const router: Router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterData'
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: Email already used.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', RegisterUser)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginData'
 *     responses:
 *       200:
 *         description: Authentication Successful.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', LoginUser)

/**
 * @swagger
 * /api/auth/getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: List of users.
 *       500:
 *         description: Internal server error.
 */
router.get('/getAllUsers', GetAllUsers)

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data.
 *       401:
 *         description: Not authenticated.
 */
router.get('/me', verifyToken, GetCurrentUser)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully.
 */
router.post('/logout', Logout)

export default router
