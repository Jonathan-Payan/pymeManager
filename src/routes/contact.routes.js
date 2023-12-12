import { Router } from "express";
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  getContact,
  getContactsByUserId
} from "../controllers/contact.controller.js";

const router = Router();

// Routes
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/", getContacts);
router.get("/:id", getContact);
router.get("/user/:user_id", getContactsByUserId);


export default router;

