jest.mock("../../models/notes");
jest.mock("../../utils/logger", () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn()
}));

const Note = require("../../models/notes");
const logger = require("../../utils/logger");
const {
    handleCreateNote,
    handleViewNote,
    handleUpdateNote,
    handleDeleteNote
} = require("../../controllers/notes");

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("handleCreateNote", () => {
    it("creates a note and returns 201 on success", async () => {
        Note.create.mockResolvedValue({ _id: "note1" });
        const req = {
            title: "My note",
            content: { type: "doc", content: [] },
            user: { id: "user1" }
        };
        const res = mockRes();

        await handleCreateNote(req, res);

        expect(Note.create).toHaveBeenCalledWith({
            title: "My note",
            content: req.content,
            user: "user1"
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ title: "My note", message: "Note created!" });
    });

    it("returns 400 and logs the error when the DB call fails", async () => {
        Note.create.mockRejectedValue(new Error("DB down"));
        const req = { title: "My note", content: {}, user: { id: "user1" } };
        const res = mockRes();

        await handleCreateNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Error occurred!" });
        expect(logger.error).toHaveBeenCalled();
    });
});

describe("handleViewNote", () => {
    it("returns 200 with the note when found", async () => {
        const note = { _id: "note1", title: "My note" };
        Note.findOne.mockResolvedValue(note);
        const req = { params: { id: "note1" }, user: { id: "user1" } };
        const res = mockRes();

        await handleViewNote(req, res);

        expect(Note.findOne).toHaveBeenCalledWith({ _id: "note1", user: "user1" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(note);
    });

    it("returns 200 with null when the note does not exist or belongs to someone else", async () => {
        Note.findOne.mockResolvedValue(null);
        const req = { params: { id: "missing" }, user: { id: "user1" } };
        const res = mockRes();

        await handleViewNote(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(null);
    });

    it("returns 400 when the DB call throws", async () => {
        Note.findOne.mockRejectedValue(new Error("DB down"));
        const req = { params: { id: "note1" }, user: { id: "user1" } };
        const res = mockRes();

        await handleViewNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});

describe("handleUpdateNote", () => {
    it("updates the note and returns 200 on success", async () => {
        Note.findOneAndUpdate.mockResolvedValue({ _id: "note1" });
        const req = {
            params: { id: "note1" },
            title: "Updated title",
            content: { type: "doc", content: [] },
            user: { id: "user1" }
        };
        const res = mockRes();

        await handleUpdateNote(req, res);

        expect(Note.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "note1", user: "user1" },
            { title: "Updated title", content: req.content }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: "note1", title: "Updated title", message: "Note updated!" });
    });

    it("returns 400 when the DB call throws", async () => {
        Note.findOneAndUpdate.mockRejectedValue(new Error("DB down"));
        const req = { params: { id: "note1" }, title: "x", content: {}, user: { id: "user1" } };
        const res = mockRes();

        await handleUpdateNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});

describe("handleDeleteNote", () => {
    it("deletes the note and returns 200 on success", async () => {
        Note.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const req = { params: { id: "note1" }, user: { id: "user1" } };
        const res = mockRes();

        await handleDeleteNote(req, res);

        expect(Note.deleteOne).toHaveBeenCalledWith({ _id: "note1", user: "user1" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: "note1", message: "Note deleted!" });
    });

    it("returns 400 when the DB call throws", async () => {
        Note.deleteOne.mockRejectedValue(new Error("DB down"));
        const req = { params: { id: "note1" }, user: { id: "user1" } };
        const res = mockRes();

        await handleDeleteNote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});