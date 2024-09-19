const path = require('path');
const Recipe = require('../models/recipeBD');

// Obtener todas las recetas o 5 recetas aleatorias
exports.getRecipes = async (req, res, next) => {
  try {
    const { category, pageSize = 8, page = 1 } = req.query;  // Valores predeterminados si no se especifican
    const userId = req.user.id;  // ID del usuario logueado

    // Crear el objeto de búsqueda (filtros)
    let query = { userId: userId };

    // Si hay una categoría especificada, añadirla al filtro
    if (category && category !== '') {
      query.category = category;
    }

    // Convertir los valores de paginación a enteros
    const limit = parseInt(pageSize, 10);  // Cantidad de recetas por página
    const skip = (parseInt(page, 10) - 1) * limit;  // Calcular cuántos documentos saltar

    // Obtener las recetas con los filtros aplicados
    const recipes = await Recipe.find(query)
                                .sort({ createdAt: -1 })  // Ordenar por fecha de creación (más recientes primero)
                                .skip(skip)  // Saltar las recetas según la página actual
                                .limit(limit);  // Limitar el número de recetas por página

    recipes.forEach(recipe => {
      if (recipe.image) {
        recipe.image = path.basename(recipe.image);
      }
    });

    // Contar el total de recetas que coinciden con los filtros (para información adicional de paginación)
    const totalRecipes = await Recipe.countDocuments(query);

    // Enviar la respuesta con las recetas y la información de paginación
    res.status(200).json({
      recipes,
      pagination: {
        currentPage: parseInt(page, 10),
        pageSize: limit,
        totalRecipes,
        totalPages: Math.ceil(totalRecipes / limit)
      }
    });
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

      const { title, category, ingredients, instructions, preparationTime } = req.body;
      const imagePath = req.file ? req.file.path || req.file.filename : null;
      const user = req.user;
  
      const newRecipe = new Recipe({
        title,
        category,
        ingredients,  // Si los ingredientes se envían como una cadena
        instructions,  // Si las instrucciones se envían como una cadena
        preparationTime,
        image: imagePath,
        userId: user?.id
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