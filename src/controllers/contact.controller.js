import { Contact } from "../models/contact.model.js";


export async function createContact(req, res) {
  try {
    const { userId } = req.body;  // Agregamos userId al cuerpo de la solicitud
    const { first_name, last_name, email, phone, cellphone, address } = req.body;

    // Verificar si userId está presente en el cuerpo de la solicitud
    if (!userId) {
      return res.status(400).json({ message: 'El userId es necesario para crear un contacto.' });
    }


    const newContact = await Contact.create({
      first_name,
      last_name,
      email,
      phone,
      cellphone,
      address,
      user_id: userId,  // Asociamos el nuevo contacto con el userId correspondiente
    });

    res.json(newContact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function getContacts(req, res) {
  try {
    const contacts = await Contact.findAll({
      attributes: ["id", "first_name", "last_name", "email", "phone", "cellphone", "address"],
      order: [["id", "ASC"]],
    });
    res.json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateContact(req, res) {
  const { id } = req.params;
  try {

    const contact = await Contact.findOne({
      attributes: ["first_name", "last_name", "email", "phone", "cellphone", "address", "id"],
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }


    contact.set(req.body);


    await contact.save();


    res.json(contact); // Aquí se envía el objeto actualizado 'contact'
  } catch (error) {
    console.error('Error al intentar actualizar el contacto:', error.message);
    return res.status(500).json({ message: error.message });
  }
}



export async function deleteContact(req, res) {
  const { id } = req.params;
  try {
    await Contact.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getContact(req, res) {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({
      where: { id },
      attributes: ["id", "first_name", "last_name", "email", "phone", "cellphone", "address"],
    });
    res.json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getContactsByUserId(req, res) {
  const { user_id } = req.params;
  try {
    const contacts = await Contact.findAll({
      where: { user_id },
      attributes: ["id", "first_name", "last_name", "email", "phone", "cellphone", "address"],
    });
    res.json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
