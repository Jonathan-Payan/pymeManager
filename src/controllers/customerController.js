// customerController.js
import Customer from '../models/customerModel.js';

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting customers' });
  }
};

const getCustomerById = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting customer' });
  }
};

const createCustomer = async (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;

  try {
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      address,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating customer' });
  }
};

const updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const { firstName, lastName, email, phone, address } = req.body;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;

    await customer.save();

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating customer' });
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting customer' });
  }
};

export { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
