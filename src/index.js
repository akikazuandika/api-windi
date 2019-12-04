import express from 'express'
import { json } from 'body-parser'
import morgan from 'morgan'

import AuthRoute from './routes/auth.route'
const app = express()
app.use(json())
app.use(morgan(":method :status :url :response-time ms :date[web] "))

app.get("/", (req, res) => {
    res.send("App running")
})

app.use("/auth", AuthRoute)

app.listen(4000, () => {
    console.log(`App running on port ${4000}`);
})