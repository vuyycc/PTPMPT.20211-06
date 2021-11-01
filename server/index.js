const express = require('express');
const app = express();
const PORT = 8797 || process.env.PORT;
const cors = require('cors');
const dotenv = require('dotenv');

const PlayerRouter = require('./routers/authRouter')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//Routers
app.use(PlayerRouter)

app.listen(PORT, () => { console.log("Server started on http://localhost:" + PORT) })
module.exports = app;
