// purchasePriceController.js
import PurchasePrice from '../models/purchasePriceModel.js';

const addPurchasePrice = async (productId, price) => {
  try {
    await PurchasePrice.create({ productId, price });
  } catch (error) {
    console.error(`Error adding purchase price for product ${productId}:`, error);
  }
};



const getPurchasePrices = async (productId) => {
  try {
    const prices = await PurchasePrice.findAll({ where: { productId } });
    return prices;
  } catch (error) {
    console.error(`Error getting purchase prices for product ${productId}:`, error);
    return [];
  }
};

const updatePurchasePrice = async (priceId, newPrice) => {
  try {
    const price = await PurchasePrice.findByPk(priceId);
    if (price) {
      price.price = newPrice;
      await price.save();
    }
  } catch (error) {
    console.error(`Error updating purchase price with ID ${priceId}:`, error);
  }
};

const deletePurchasePrice = async (priceId) => {
  try {
    const price = await PurchasePrice.findByPk(priceId);
    if (price) {
      await price.destroy();
    }
  } catch (error) {
    console.error(`Error deleting purchase price with ID ${priceId}:`, error);
  }
};

export {addPurchasePrice, getPurchasePrices, updatePurchasePrice, deletePurchasePrice };




