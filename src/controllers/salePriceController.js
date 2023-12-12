// salePriceController.js
import SalePrice from '../models/salePriceModel.js';

const addSalePrice = async (productId, price) => {
  try {
    await SalePrice.create({ productId, price });
  } catch (error) {
    console.error(`Error adding sale price for product ${productId}:`, error);
  }
};



const getSalePrices = async (productId) => {
  try {
    const prices = await SalePrice.findAll({ where: { productId } });
    return prices;
  } catch (error) {
    console.error(`Error getting sale prices for product ${productId}:`, error);
    return [];
  }
};

const updateSalePrice = async (priceId, newPrice) => {
  try {
    const price = await SalePrice.findByPk(priceId);
    if (price) {
      price.price = newPrice;
      await price.save();
    }
  } catch (error) {
    console.error(`Error updating sale price with ID ${priceId}:`, error);
  }
};

const deleteSalePrice = async (priceId) => {
  try {
    const price = await SalePrice.findByPk(priceId);
    if (price) {
      await price.destroy();
    }
  } catch (error) {
    console.error(`Error deleting sale price with ID ${priceId}:`, error);
  }
};

export { addSalePrice, getSalePrices, updateSalePrice, deleteSalePrice };

