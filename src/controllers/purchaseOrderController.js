// purchaseOrderController.js
import PurchaseOrderModel from '../models/purchaseOrderModel.js';
import { addInventoryEntry } from "./inventoryController.js";

const getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrderModel.findAll();
    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting purchase orders' });
  }
};

const updatePurchaseOrder = async (req, res) => {
  const { orderId } = req.params; // Obtiene el ID de la orden de compra desde los parámetros de la solicitud
  const { providerId, status } = req.body; // Obtiene el nuevo proveedor y estado desde el cuerpo de la solicitud

  try {
    // Busca la orden de compra por su ID
    const purchaseOrder = await PurchaseOrderModel.findByPk(orderId);

    // Verifica si la orden de compra existe
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    // Actualiza el proveedor y el estado de la orden de compra
    await purchaseOrder.update({
      providerId,
      status,
    });

    res.status(200).json({ message: 'Purchase order updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating purchase order' });
  }
};

// Nuevo endpoint para actualizar el estado y realizar el movimiento de inventario
const updateOrderAndInventory = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  const { status, productId, quantity } = req.body;

  try {
    const purchaseOrder = await PurchaseOrderModel.findByPk(orderId);

    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }

    await purchaseOrder.update({
      status,
    });

    // Si el estado es 'received', realiza un movimiento de ingreso al inventario
    if (status === 'received') {
      await addInventoryEntry({
        body: {
          productId,
          quantity
        },
      });
    }

    res.status(200).json({ message: 'Purchase order and inventory updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating purchase order and inventory' });
  }
};

export { getPurchaseOrders, updatePurchaseOrder, updateOrderAndInventory };
