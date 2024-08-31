const express = require('express');

const recipeController = require('../controllers/recipeCtrl');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Obtiene todas las recetas o las 5 más visitadas
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limitar el número de recetas (para las más visitadas)
 *       - in: query
 *         name: popular
 *         schema:
 *           type: boolean
 *         description: Obtener recetas más visitadas si se establece como true
 *     responses:
 *       200:
 *         description: Lista de recetas
 *       500:
 *         description: Error del servidor
 */
router.get('/recipes', isAuth, recipeController.getRecipes);

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Obtener una receta por su ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la receta
 *     responses:
 *       200:
 *         description: Detalles de la receta
 *       404:
 *         description: Receta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/recipes/:recipeId', isAuth, recipeController.getRecipe);

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Crea una nueva receta
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la receta
 *               category:
 *                 type: string
 *                 description: Categoría de la receta
 *               ingredients:
 *                 type: string
 *                 description: Ingredientes de la receta
 *               instructions:
 *                 type: string
 *                 description: Instrucciones para la receta
 *               preparationTime:
 *                 type: integer
 *                 description: Tiempo de preparación en minutos
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de la receta
 *     responses:
 *       201:
 *         description: Receta creada con éxito
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
router.post('/recipe', isAuth, recipeController.createRecipe);

/**
 * @swagger
 * /recipes/{recipeId}:
 *   delete:
 *     summary: Elimina una receta por su ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la receta
 *     responses:
 *       200:
 *         description: Receta eliminada con éxito
 *       404:
 *         description: Receta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/recipes/:recipeId', isAuth, recipeController.deleteRecipe);

module.exports = router;
