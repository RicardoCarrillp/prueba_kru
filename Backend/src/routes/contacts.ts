import express from 'express'
import admin  from 'firebase-admin';
require('dotenv').config();

const router= express.Router();
var serviceAccount = require("../../contactkru-22bd9-firebase-adminsdk-z2h2s-7567b3d234.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
})

const db = admin.database();

router.get('/', (_req, res) => {
    db.ref('contacts').once('value',(snapshot)=>{
        const contacts= snapshot.val();
        res.send({ contacts: contacts });

    })
})

router.post('/', (req, res) =>{
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
    db.ref('contacts').push(newContact)
    res.send(`saving a ${newContact.name}`)
})

export default router;