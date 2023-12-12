
import { User } from "../models/userModel.js";
import { Contact } from "../models/contact.model.js";

export const setAssociations = () => {
  User.hasMany(Contact, { foreignKey: "user_id" });
  Contact.belongsTo(User, { foreignKey: "user_id" });
};

