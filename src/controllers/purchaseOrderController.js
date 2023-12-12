// purchaseOrderController.js
import PurchaseOrderModel from '../models/purchaseOrderModel.js';

const getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrderModel.findAll();
    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting purchase orders' });
  }
};

export { getPurchaseOrders };
