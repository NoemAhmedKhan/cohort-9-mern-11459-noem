const express = require("express");
const notesRouter = express.Router();
const { authenticateUser, validateNote} = require("../middlewares/auth");
const { handleCreateNote, handleViewNote, handleUpdateNote, handleDeleteNote } = require("../controllers/notes");

notesRouter.post("/create", authenticateUser, validateNote, handleCreateNote)
    .get("/:id/view", authenticateUser, handleViewNote)
    .patch("/:id/edit", authenticateUser, validateNote, handleUpdateNote)
    .delete("/:id/delete", authenticateUser, handleDeleteNote);

module.exports = notesRouter;