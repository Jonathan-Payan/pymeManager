// inventoryController.js
import Inventory from '../models/inventoryModel.js';

const addInventoryOperation = async (req, res) => {
  try {
    const { productId, quantity, operationType } = req.body;
    const operationDate = new Date();

    const newOperation = await Inventory.create({
      productId,
      quantity: operationType === 'entrada' ? quantity : -quantity,
      operationType,
      operationDate,
    });

    res.status(201).json(newOperation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding inventory operation' });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting inventory' });
  }
};

export { addInventoryOperation, getInventory };
