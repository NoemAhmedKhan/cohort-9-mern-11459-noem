const Note = require("../models/notes");

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

        return res.status(201).json({
            title: req.title,
            message: "Note created!"
        });
    }catch (error){
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
        return await res.status(200).json(note);
    }catch (error){
        return res.status(400).json({message: "Error occurred!"});
    }
}

const handleUpdateNote = async (req, res) => {
    try {
        const id = req.params.id;
        await Note.findOneAndUpdate({_id: id, user: req.user.id}, {title: req.title, content: req.content});
        return await res.status(200).json({id: id, title: req.title, message: "Note updated!"});
    }catch (error){
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
        return await res.status(200).json({id: id, message: "Note deleted!"});
    }catch (error){
        return res.status(400).json({message: "Error occurred!"});
    }
}

module.exports = { handleCreateNote, handleViewNote, handleUpdateNote, handleDeleteNote };