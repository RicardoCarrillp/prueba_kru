
import db from '../services/db'
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const getContacts =  async (_req: any, res: any) => {
    try {
        const docsRef = await db.collection('contacts');
        const mainDocs: any = [];

        const docs = await docsRef.get();
        docs.forEach(async (doc) => {
            mainDocs.push({ ...doc.data(), id: doc.id });
        });

        const result = {
            status: 200,
            data: mainDocs
        }
        res.send(result)
    } catch (error: any) {

        const result = {
            status: 500,
            data: error.message
        }
        res.send(result)
    }
}

const createContacts = async (req: any, res: any )=>{
    try {
        const newContact = {
            name: req.body.name,
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

        const result = {
            status:200,
            data: `Contact ${newContact.name} successfully created`
        }
        res.send(result)
    } catch (error: any) {
        const result = {
            status: 500,
            data: error.message
        }
        res.send(result)
    }

}

// module.exports ={
//     createContacts
// }

export { getContacts,createContacts };