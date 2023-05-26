import express from 'express'
import contactRouter from './routes/contacts'


const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())
const port = process.env.PORT || 4000;


app.use("/api/contacts", contactRouter)
app.listen(port, () => console.log(`App listening on port ${port}!`))