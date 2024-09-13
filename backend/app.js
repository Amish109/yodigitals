const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const cookiesParser = require("cookie-parser")



app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookiesParser())


const brand = require("./routers/brand");
const productenq = require("./routers/productenq");
const categories = require("./routers/categories");


app.use("/brand", brand);
app.use("/productenq", productenq);
app.use("/categories", categories);


module.exports = app;