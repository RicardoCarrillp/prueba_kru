import express from "express";

import { createContacts, getContacts, deleteContacts } from "../controllers/contactsController";

const router = express.Router();

router.get('/', getContacts);

router.post('/', createContacts);

router.get('/delete/:id', deleteContacts);

export default router;
