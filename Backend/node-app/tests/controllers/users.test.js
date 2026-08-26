jest.mock("../../models/users");
jest.mock("../../models/notes");
jest.mock("../../security/jwt");
jest.mock("bcrypt");
jest.mock("../../utils/logger", () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn()
}));

const User = require("../../models/users");
const Note = require("../../models/notes");
const { generateJWT } = require("../../security/jwt");
const bcrypt = require("bcrypt");
const logger = require("../../utils/logger");
const {
    handleSignup,
    handleLogin,
    handleLogout,
    handleDashboard,
    handleProfile,
    handleEditProfile,
    handleChangePassword
} = require("../../controllers/users");

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res;
};

describe("handleSignup", () => {
    it("returns 400 when the email is already registered", async () => {
        User.findOne.mockResolvedValue({ _id: "existingUser" });
        const req = { body: { fullName: "Jane", email: "jane@gmail.com", password: "Passw0rd!" } };
        const res = mockRes();

        await handleSignup(req, res);

        expect(User.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "This email is already registered!" });
    });

    it("creates the user and returns 201 on success", async () => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ _id: "newUser" });
        const req = { body: { fullName: "Jane", email: "jane@gmail.com", password: "Passw0rd!" } };
        const res = mockRes();

        await handleSignup(req, res);

        expect(User.create).toHaveBeenCalledWith({ fullName: "Jane", email: "jane@gmail.com", password: "Passw0rd!" });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Account Created!" });
    });

    it("returns 400 and logs the error when the DB call fails", async () => {
        User.findOne.mockRejectedValue(new Error("DB down"));
        const req = { body: { fullName: "Jane", email: "jane@gmail.com", password: "Passw0rd!" } };
        const res = mockRes();

        await handleSignup(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(logger.error).toHaveBeenCalled();
    });
});

describe("handleLogin", () => {
    const selectMock = (returnValue) => ({ select: jest.fn().mockResolvedValue(returnValue) });

    it("returns 400 when no user matches the email", async () => {
        User.findOne.mockReturnValue(selectMock(null));
        const req = { body: { email: "nobody@gmail.com", password: "Passw0rd!" } };
        const res = mockRes();

        await handleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid Credentials!" });
    });

    it("returns 400 when the password does not match", async () => {
        User.findOne.mockReturnValue(selectMock({ email: "jane@gmail.com", password: "hashed" }));
        bcrypt.compare.mockResolvedValue(false);
        const req = { body: { email: "jane@gmail.com", password: "wrongPass1!" } };
        const res = mockRes();

        await handleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid Credentials!" });
    });

    it("sets a cookie and returns 200 on successful login", async () => {
        User.findOne.mockReturnValue(selectMock({ _id: "user1", email: "jane@gmail.com", password: "hashed" }));
        bcrypt.compare.mockResolvedValue(true);
        generateJWT.mockResolvedValue("signed.jwt.token");
        const req = { body: { email: "jane@gmail.com", password: "Passw0rd!" } };
        const res = mockRes();

        await handleLogin(req, res);

        expect(res.cookie).toHaveBeenCalledWith("token", "signed.jwt.token", expect.objectContaining({ httpOnly: true }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Login Successful!" });
    });

    it("returns 401 when an unexpected error occurs", async () => {
        User.findOne.mockImplementation(() => { throw new Error("DB down"); });
        const req = { body: { email: "jane@gmail.com", password: "Passw0rd!" } };
        const res = mockRes();

        await handleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});

describe("handleLogout", () => {
    it("clears the cookie and returns 200", async () => {
        const req = { user: { id: "user1" } };
        const res = mockRes();

        await handleLogout(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith("token");
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

describe("handleDashboard", () => {
    it("returns 200 with the user's notes", async () => {
        const notes = [{ _id: "note1" }, { _id: "note2" }];
        Note.find.mockResolvedValue(notes);
        const req = { user: { id: "user1" } };
        const res = mockRes();

        await handleDashboard(req, res);

        expect(Note.find).toHaveBeenCalledWith({ user: "user1" });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(notes);
    });

    it("returns 401 when the DB call fails", async () => {
        Note.find.mockRejectedValue(new Error("DB down"));
        const req = { user: { id: "user1" } };
        const res = mockRes();

        await handleDashboard(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});

describe("handleProfile", () => {
    it("returns the fullName and email from req.user, without the password", async () => {
        const req = { user: { id: "user1", fullName: "Jane", email: "jane@gmail.com" } };
        const res = mockRes();

        await handleProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ fullName: "Jane", email: "jane@gmail.com" });
    });
});

describe("handleEditProfile", () => {
    it("updates the profile, re-issues the cookie, and returns 200", async () => {
        const updatedUser = { _id: "user1", fullName: "Jane Updated", email: "jane@gmail.com" };
        User.findByIdAndUpdate.mockResolvedValue(updatedUser);
        generateJWT.mockResolvedValue("new.jwt.token");
        const req = { user: { id: "user1" }, body: { fullName: "Jane Updated", email: "jane@gmail.com" } };
        const res = mockRes();

        await handleEditProfile(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            "user1",
            { fullName: "Jane Updated", email: "jane@gmail.com" },
            { returnDocument: "after" }
        );
        expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("returns 401 when the update fails", async () => {
        User.findByIdAndUpdate.mockRejectedValue(new Error("DB down"));
        const req = { user: { id: "user1" }, body: { fullName: "Jane", email: "jane@gmail.com" } };
        const res = mockRes();

        await handleEditProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});

describe("handleChangePassword", () => {
    it("returns 400 when the old password is wrong", async () => {
        const userDoc = { password: "hashed", save: jest.fn() };
        User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(userDoc) });
        bcrypt.compare.mockResolvedValue(false);
        const req = { user: { id: "user1" }, body: { oldPassword: "wrong", newPassword: "NewPass1!" } };
        const res = mockRes();

        await handleChangePassword(req, res);

        expect(userDoc.save).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("updates and saves the new password on success", async () => {
        const userDoc = { password: "hashed", save: jest.fn().mockResolvedValue(true) };
        User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(userDoc) });
        bcrypt.compare.mockResolvedValue(true);
        const req = { user: { id: "user1" }, body: { oldPassword: "OldPass1!", newPassword: "NewPass1!" } };
        const res = mockRes();

        await handleChangePassword(req, res);

        expect(userDoc.password).toBe("NewPass1!");
        expect(userDoc.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 401 when an unexpected error occurs", async () => {
        User.findById.mockImplementation(() => { throw new Error("DB down"); });
        const req = { user: { id: "user1" }, body: { oldPassword: "x", newPassword: "y" } };
        const res = mockRes();

        await handleChangePassword(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});