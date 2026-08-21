const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = 8080;
const connection = require("./connection");

connection();

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(cookieParser());
app.use("/", userRouter);
app.use("/notes", notesRouter);
app.listen(PORT, () => {
    console.log(`Server Started At http://localhost:${PORT}/`);
});