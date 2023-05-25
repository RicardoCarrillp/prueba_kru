import express from 'express'
import admin  from 'firebase-admin';
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const router= express.Router();
const serviceAccount = require("../../keyFirebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore(); 

router.get('/', async (_req, res) => {
    const docsRef = await db.collection('contacts');
    const mainDocs:any = [];

    const docs = await docsRef.get();
    docs.forEach(async (doc) => {
        mainDocs.push({ ...doc.data(), id: doc.id });
    });

    res.send(mainDocs)
})

router.post('/', async(req, res) =>{
    const newContact={
        name:req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        birthday: req.body.birthday,
        address: req.body.address,
        typeContact: req.body.typeContact,
        origin: req.body.origin,
    }
    const contactsDb = db.collection('contacts');
    await contactsDb.doc(uuidv4()).set(newContact); 
    res.send(`saving a ${newContact.name}`)
})

export default router;