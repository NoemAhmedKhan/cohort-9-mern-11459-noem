const Note = require("../models/notes");
const logger = require("../utils/logger");

const handleCreateNote = async (req, res) => {
    try{
        // INSERT DATA INTO MONGO DB
        const note = await Note.create(
            {
                title: req.title,
                content: req.content,
                user: req.user.id
            }
        );

        logger.info(`Note created (id: ${note._id}) by user ${req.user.id}`);

        return res.status(201).json({
            title: req.title,
            message: "Note created!"
        });
    }catch (error){
        logger.error(`Create note failed for user ${req.user?.id}: ${error.message}`);
        return res.status(400).json({message: "Error occurred!"});
    }
}

const handleViewNote = async (req, res) => {
    try{
        const id = req.params.id;
        const note = await Note.findOne({
            _id: id,
            user: req.user.id
        });
        return res.status(200).json(note);
    }catch (error){
        logger.error(`View note failed (id: ${req.params.id}) for user ${req.user?.id}: ${error.message}`);
        return res.status(400).json({message: "Error occurred!"});
    }
}

const handleUpdateNote = async (req, res) => {
    try {
        const id = req.params.id;
        await Note.findOneAndUpdate({_id: id, user: req.user.id}, {title: req.title, content: req.content});
        logger.info(`Note updated (id: ${id}) by user ${req.user.id}`);
        return res.status(200).json({id: id, title: req.title, message: "Note updated!"});
    }catch (error){
        logger.error(`Update note failed (id: ${req.params.id}) for user ${req.user?.id}: ${error.message}`);
        return res.status(400).json({message: "Error occurred!"});
    }
}

const handleDeleteNote = async (req, res) => {
    try{
        const id = req.params.id;
        await Note.deleteOne({
            _id: id,
            user: req.user.id
        });
        logger.info(`Note deleted (id: ${id}) by user ${req.user.id}`);
        return res.status(200).json({id: id, message: "Note deleted!"});
    }catch (error){
        logger.error(`Delete note failed (id: ${req.params.id}) for user ${req.user?.id}: ${error.message}`);
        return res.status(400).json({message: "Error occurred!"});
    }
}

module.exports = { handleCreateNote, handleViewNote, handleUpdateNote, handleDeleteNote };