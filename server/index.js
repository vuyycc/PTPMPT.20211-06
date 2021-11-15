const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');



const PlayerRouter = require('./routers/authRouter')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//Routers
app.use(PlayerRouter)

app.get("/123", (req, res) => { res.json({ message: "Welcome to bezkoder application." }); });

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

module.exports = app;