// productController.js
import ProductModel from '../models/productModel.js';

const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByPk(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status  (404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting the product' });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Attempting to update product with ID: ${id}`);
    
    const [numUpdatedRows] = await ProductModel.update(req.body, {
      where: { id },
    });

    console.log(`Number of updated rows: ${numUpdatedRows}`);

    if (numUpdatedRows > 0) {
      console.log('Product updated successfully');
      // Puedes realizar una nueva búsqueda para obtener el producto actualizado si es necesario
      const updatedProduct = await ProductModel.findByPk(id);
      res.status(200).json(updatedProduct);
    } else {
      console.log('No rows were updated.');
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating the product:', error);
    res.status(500).json({ message: 'Error updating the product' });
  }
};




const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const numDeletedRows = await ProductModel.destroy({
      where: { id },
    });
    if (numDeletedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the product' });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
