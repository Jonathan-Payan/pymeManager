import { hash, compare } from 'bcrypt';

// Generar un hash para una contraseña
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  console.log("---retorno--->   " + hashedPassword);

  return hashedPassword;
}

// Verificar una contraseña con el hash almacenado
async function comparePasswords(providedPassword, storedHash) {
  return compare(providedPassword, storedHash);
}

export { hashPassword, comparePasswords };


