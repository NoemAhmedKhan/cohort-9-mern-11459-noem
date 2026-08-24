const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./connection");
const userRouter = require("./routes/users");
const { PORT } = require("./config/env");

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(cookieParser());
app.use("/", userRouter);

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