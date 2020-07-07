require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//local imports - My routes
const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movie")
const theatreRoutes = require("./routes/theatre")
const screenRoutes = require("./routes/screen")
const bookingRoutes = require("./routes/booking")

//database connectivity
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED SUCCESFULLY ...!")
}).catch(() => {
    console.log("DB CONNECTION REFUSED ...!")
})

//Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//My routes
app.use("/api", authRoutes);
app.use("/api", movieRoutes);
app.use("/api", theatreRoutes);
app.use("/api", screenRoutes);
app.use("/api", bookingRoutes);

//caughting uncaught exceptions
process.on('uncaughtException', (err) => {
    throw err;
    process.exit(1);
})

//caughting unhandled rejections
process.on('unhandledRejection', (err) => {
    throw err;
    process.exit(1);
})

//port
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})