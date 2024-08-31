const path = require('path');
const Recipe = require('../models/recipeBD');

// Obtener todas las recetas o 5 recetas aleatorias
exports.getRecipes = async (req, res, next) => {
    try {
      const { limit, popular } = req.query;
  
      let recipes;
      
      // Si se solicita un límite de recetas (por ejemplo, para la página de bienvenida)
      if (popular && limit) {
        recipes = await Recipe.find().sort({ views: -1 })  // Ordenar por número de visitas (descendente)
                                     .limit(parseInt(limit));  // Limitar el número de resultados
      } else {
        recipes = await Recipe.find().sort({ createdAt: -1 });  // Recetas más recientes
      }
  
      res.status(200).json({ recipes });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las recetas', error: error.message });
    }
  };
  
  // Obtener una receta por ID
  exports.getRecipe = async (req, res, next) => {
    const recipeId = req.params.recipeId;
  
    try {
      const recipe = await Recipe.findById(recipeId);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Receta no encontrada' });
      }
  
      // Incrementar el número de visitas
      recipe.views += 1;
      await recipe.save();
  
      res.status(200).json({ recipe });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la receta', error: error.message });
    }
  };
  
  // Crear una nueva receta
  exports.createRecipe = async (req, res, next) => {
    try {
      if(!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
      }
      const { title, category, ingredients, instructions, preparationTime, userEmail } = req.body;
      const imagePath = req.file ? req.file.path : null;  // Si se sube una imagen
      const userId = req.userId;
  
      const newRecipe = new Recipe({
        title,
        category,
        ingredients: ingredients.split(','),  // Si los ingredientes se envían como una cadena
        instructions: instructions.split(','),  // Si las instrucciones se envían como una cadena
        preparationTime,
        image: imagePath,
        userId
      });
  
      await newRecipe.save();
      res.status(201).json({ message: 'Receta creada con éxito', recipe: newRecipe });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la receta', error: error.message });
    }
  };
  
  // Eliminar una receta por ID
  exports.deleteRecipe = async (req, res, next) => {
    const recipeId = req.params.recipeId;
  
    try {
      const recipe = await Recipe.findByIdAndDelete(recipeId);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Receta no encontrada' });
      }
  
      res.status(200).json({ message: 'Receta eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la receta', error: error.message });
    }
  };