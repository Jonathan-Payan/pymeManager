import { User } from "../models/userModel.js";
import { comparePasswords } from "../utils/password-utils.js";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';




export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    // Verificar si el usuario o el correo electrónico ya existen
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario o el correo electrónico ya están registrados." });
    }

   
    const newUser = await User.create({ username, email, password: password });

    res.status(201).json({ message: "Usuario registrado exitosamente.", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}




export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const passwordMatch = comparePasswords(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ userId: existingUser.id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: "Inicio de sesión exitoso.", user: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
