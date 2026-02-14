import express, { Router } from 'express'
import {
  AddFavorite,
  DeleteFavorite,
  GetAllFavorites,
  GetFavoriteById,
  UpdateFavorite,
} from '../controllers/FavoriteController'
const router: Router = express.Router()

/**
 * @swagger
 * /favorites:
 *   post:
 *     description: Add a new favorite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               favoriteItem:
 *                 type: string
 *     responses:
 *       201:
 *         description: Favorite successfully added
 *       400:
 *         description: Bad Request
 */
router.post('/', AddFavorite)

/**
 * @swagger
 * /favorites/{id}:
 *   put:
 *     description: Update a favorite item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the favorite to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               favoriteItem:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite successfully updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Favorite not found
 */
router.put('/:id', UpdateFavorite)

/**
 * @swagger
 * /favorites:
 *   get:
 *     description: Get a list of all favorites
 *     responses:
 *       200:
 *         description: List of all favorites
 *       400:
 *         description: Bad Request
 */
router.get('/', GetAllFavorites)

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     description: Delete a favorite item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the favorite to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite successfully deleted
 *       404:
 *         description: Favorite not found
 */
router.delete('/:id', DeleteFavorite)

/**
 * @swagger
 * /favorites/{id}:
 *   get:
 *     description: Get a favorite item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the favorite to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite found
 *       404:
 *         description: Favorite not found
 */
router.get('/:id', GetFavoriteById)

export default router
