import express from "express";

import { createContacts, getContacts } from "../controllers/contactsController";

const router = express.Router();

router.get("/", getContacts);

router.post("/", createContacts);

export default router;
