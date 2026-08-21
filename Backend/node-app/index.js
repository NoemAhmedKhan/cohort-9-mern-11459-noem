const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server Started At http://localhost:${PORT}/`);
});