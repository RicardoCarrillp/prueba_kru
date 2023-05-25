import express from 'express'
import contactRouter from './routes/contacts'


const app = express();
app.use(express.json());
const port = process.env.PORT;


app.use("/api/contacts", contactRouter)
app.listen(port, () => console.log(`App listening on port ${port}!`))