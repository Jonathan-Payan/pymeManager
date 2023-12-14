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
  console.log(id);
  console.log(req.body);
  try {
    const [numUpdatedRows] = await ProductModel.update(req.body, {
      where: { id },
    });
    if (numUpdatedRows > 0) {
      const updatedProduct = await ProductModel.findByPk(id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
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
