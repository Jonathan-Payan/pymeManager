// inventory.controller.js
import Inventory from '../models/inventoryModel.js';


const addInventoryEntry = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const entryDate = new Date();
  
      // Verificar si ya existe una entrada para el mismo producto
      const existingEntry = await Inventory.findOne({
        where: {
          productId: productId,
          exitDate: null, // Solo considerar entradas no asociadas con salidas
        },
      });
  
      if (existingEntry) {
        // Si existe, sumar la cantidad a la entrada existente
        existingEntry.quantity += quantity;
        await existingEntry.save();
        res.status(200).json(existingEntry);
      } else {
        // Si no existe, crear una nueva entrada
        const newEntry = await Inventory.create({
          productId,
          quantity,
          entryDate,
        });
  
        res.status(201).json(newEntry);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding inventory entry' });
    }
  };
  

const addInventoryExit = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const exitDate = new Date();

    // Encuentra la entrada existente para el producto
    const existingEntry = await Inventory.findOne({
      where: {
        productId,
        exitDate: null, // Busca entradas que aún no tengan fecha de salida
      },
    });

    if (!existingEntry) {
      return res.status(404).json({ message: 'Inventory entry not found for the specified product' });
    }

    // Actualiza la entrada existente con la cantidad y la fecha de salida
    const updatedEntry = await existingEntry.update({
      quantity: existingEntry.quantity - quantity, // Ajusta la cantidad
      exitDate,
    });

    res.status(201).json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding inventory exit' });
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

export { addInventoryEntry, addInventoryExit, getInventory };
