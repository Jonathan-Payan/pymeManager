// categoryController.js
import CategoryModel from '../models/categoryModel.js';

export async function createCategory(req, res) {
  try {
    const newCategory = await CategoryModel.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error.message);
    res.status(500).json({ message: 'Error creating the category' });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await CategoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error.message);
    res.status(500).json({ message: 'Error getting categories' });
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.set(req.body);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error.message);
    res.status(500).json({ message: 'Error updating the category' });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    await CategoryModel.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting category:', error.message);
    res.status(500).json({ message: 'Error deleting the category' });
  }
}

export async function getCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findOne({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error getting category:', error.message);
    res.status(500).json({ message: 'Error getting the category' });
  }
}
