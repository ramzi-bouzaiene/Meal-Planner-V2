import express from 'express'
import {
  AddMeal,
  UpdateMeal,
  GetAllMeals,
  DeleteMeal,
} from '../controllers/MealPlanController'
const router = express.Router()

/**
 * @swagger
 * /meals:
 *   post:
 *     description: Add a new meal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Meal successfully added
 *       400:
 *         description: Bad Request
 */
router.post('/', AddMeal)

/**
 * @swagger
 * /meals/{id}:
 *   put:
 *     description: Update a meal by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the meal to update
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meal successfully updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Meal not found
 */
router.put('/:id', UpdateMeal)

/**
 * @swagger
 * /meals:
 *   get:
 *     description: Get a list of all meals
 *     responses:
 *       200:
 *         description: List of all meals
 *       400:
 *         description: Bad Request
 */
router.get('/', GetAllMeals)

/**
 * @swagger
 * /meals/{id}:
 *   delete:
 *     description: Delete a meal by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the meal to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal successfully deleted
 *       404:
 *         description: Meal not found
 */
router.delete('/:id', DeleteMeal)

export default router
