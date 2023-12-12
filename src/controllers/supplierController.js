// supplierController.js
import SupplierModel from '../models/supplierModel.js';

export async function createSupplier(req, res) {
  try {
    const newSupplier = await SupplierModel.create(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('Error creating supplier:', error.message);
    res.status(500).json({ message: 'Error creating the supplier' });
  }
}

export async function getSuppliers(req, res) {
  try {
    const suppliers = await SupplierModel.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error getting suppliers:', error.message);
    res.status(500).json({ message: 'Error getting suppliers' });
  }
}

export async function updateSupplier(req, res) {
  const { id } = req.params;
  try {
    const supplier = await SupplierModel.findOne({
      where: { id },
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    supplier.set(req.body);
    await supplier.save();

    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error updating supplier:', error.message);
    res.status(500).json({ message: 'Error updating the supplier' });
  }
}

export async function deleteSupplier(req, res) {
  const { id } = req.params;
  try {
    await SupplierModel.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting supplier:', error.message);
    res.status(500).json({ message: 'Error deleting the supplier' });
  }
}

export async function getSupplier(req, res) {
  const { id } = req.params;
  try {
    const supplier = await SupplierModel.findOne({
      where: { id },
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error getting supplier:', error.message);
    res.status(500).json({ message: 'Error getting the supplier' });
  }
}
