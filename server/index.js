const express = require("express");
const connectWithDb = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// connect with databse
connectWithDb();

const app = express();

// cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

// regular middleare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// morgan middleware
app.use(morgan("tiny"));

// routes middleware
app.use("/api/v1", require("./routes/form"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
