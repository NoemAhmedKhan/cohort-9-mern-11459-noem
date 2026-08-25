const express = require("express");
const app = express();
const CORS = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./connection");
const userRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
const { PORT } = require("./config/env");

app.use(CORS({
        origin: 'http://localhost:5173',
        credentials: true
    })
)
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use("/", userRouter);
app.use("/notes", notesRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server Started At http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();